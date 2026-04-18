"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { sessionStore } from '@/lib/storage';
import { SessionUser } from '@/lib/types';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);

  // Sync auth state
  useEffect(() => {
    setUser(sessionStore.getUser());
  }, [pathname]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    sessionStore.clear();
    setUser(null);
    router.push('/');
    router.refresh(); // Ensure all components re-fetch data based on guest mode
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Explore', href: '/explore' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Messages', href: '/messages' },
    { label: 'AI Center', href: '/ai-center' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  const activeClass = "px-4 py-2 bg-[#edeae4] rounded-full text-[#1c1a17] font-semibold text-[13px] tracking-tight transition-all";
  const inactiveClass = "px-4 py-2 text-[#5f685f] hover:text-[#1a1f1d] transition-colors text-[13px] tracking-tight font-semibold transition-all";

  return (
    <div className="flex justify-between items-center text-sm font-semibold mb-12 relative z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2.5 group">
        <div className="bg-[#0f766e] text-white w-10 h-10 flex items-center justify-center rounded-md font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
          H
        </div>
        <span className="font-bold text-[18px] tracking-tight font-display text-[#1c1a17]">Helplytics AI</span>
      </Link>

      {/* DESKTOP NAV */}
      <div className="hidden lg:flex px-1.5 py-1.5 items-center bg-[#fdfaf5]/50 backdrop-blur-sm rounded-full border border-[#1a1f1d]/5">
        {navItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            className={isActive(item.href) ? activeClass : inactiveClass}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* DESKTOP ACTIONS */}
      <div className="hidden lg:flex items-center space-x-3">
        {user ? (
          <>
            <Link 
              href="/profile" 
              className={`px-4 py-2 rounded-full font-semibold text-[13px] border border-[#1a1f1d]/5 shadow-sm transition-all ${
                isActive('/profile') 
                  ? 'bg-[#edeae4] text-[#1c1a17]' 
                  : 'bg-white/60 backdrop-blur-sm text-[#5f685f] hover:bg-white/80'
              }`}
            >
              My Profile
            </Link>
            <button 
              onClick={handleLogout}
              className="px-5 text-white py-2.5 bg-[#112322] hover:bg-[#1a1f1d] transition-all font-semibold text-[13px] rounded-full shadow-lg cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              href="/notifications" 
              className={`px-4 py-2 rounded-full font-semibold text-[13px] border border-[#1a1f1d]/5 shadow-sm transition-all ${
                isActive('/notifications') 
                  ? 'bg-[#edeae4] text-[#1c1a17]' 
                  : 'bg-white/60 backdrop-blur-sm text-[#5f685f] hover:bg-white/80'
              }`}
            >
              Live Community Signals
            </Link>
            <Link href="/auth" className="px-5 text-white! py-2.5 bg-[#0f766e] hover:bg-[#0d6d65] transition-all font-semibold text-[13px] rounded-full shadow-[0_4px_14px_rgba(15,118,110,0.3)]">
              Join the Community
            </Link>
          </>
        )}
      </div>

      {/* MOBILE HAMBURGER BUTTON */}
      <button 
        className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-[#1a1f1d]/5 rounded-xl shadow-sm hover:bg-white transition-all z-[1001]"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        )}
      </button>

      {/* MOBILE SIDEBAR OVERLAY */}
      <div className={`fixed inset-0 bg-[#1c1a17]/20 backdrop-blur-md z-[1000] transition-opacity duration-300 lg:hidden ${
        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setIsMenuOpen(false)} />

      {/* MOBILE SIDEBAR PANEL */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-[1001] transition-transform duration-300 lg:hidden transform ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-8 flex flex-col h-full uppercase">
          <div className="flex items-center space-x-2.5 mb-12">
            <div className="bg-[#0f766e] text-white w-8 h-8 flex items-center justify-center rounded-md font-bold text-xs">H</div>
            <span className="font-bold text-[14px] tracking-tight font-display text-[#1c1a17]">Helplytics</span>
          </div>

          <div className="flex flex-col space-y-2 flex-grow">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`py-3 px-4 rounded-xl text-[14px] font-bold tracking-wider transition-all ${
                  isActive(item.href) 
                    ? 'bg-[#edeae4] text-[#1c1a17]' 
                    : 'text-[#5f685f] hover:bg-[#f9f8f4]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <Link 
                href="/profile" 
                className={`py-3 px-4 rounded-xl text-[14px] font-bold tracking-wider transition-all ${
                  isActive('/profile') 
                    ? 'bg-[#edeae4] text-[#1c1a17]' 
                    : 'text-[#5f685f] hover:bg-[#f9f8f4]'
                }`}
              >
                My Profile
              </Link>
            )}
          </div>

          <div className="mt-auto space-y-4 pt-8 border-t border-[#1a1f1d]/5">
            {user ? (
               <button 
                onClick={handleLogout}
                className="block w-full text-center py-4 bg-[#112322] text-white rounded-xl text-[12px] font-bold tracking-widest shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                SIGN OUT
              </button>
            ) : (
              <>
                <Link 
                  href="/notifications" 
                  className={`block w-full text-center py-4 rounded-xl text-[12px] font-bold tracking-widest transition-all ${
                    isActive('/notifications') 
                      ? 'bg-[#edeae4] text-[#1c1a17]' 
                      : 'bg-[#f9f8f4] text-[#5f685f]'
                  }`}
                >
                  COMMUNITY SIGNALS
                </Link>
                <Link href="/auth" className="block w-full text-center py-4 bg-[#0f766e] text-white! rounded-xl text-[12px] font-bold tracking-widest shadow-lg active:scale-95 transition-all">
                  JOIN NETWORK
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
