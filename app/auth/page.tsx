"use client";

import Link from "next/link";
import { AuthForm } from "@/components/forms/AuthForm";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export default function AuthPage() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  const navItemClass = (href: string) =>
    `px-4 py-2 text-[14px] font-bold transition-all ${isActive(href) ? "text-[#1c1a17]" : "text-[#5f685f] hover:text-[#1a1f1d]"
    }`;

  return (
    <div className="min-h-screen text-[#1c1a17] bg-[#fdfaf5] font-sans selection:bg-[#0f766e]/20 relative overflow-hidden pb-20">

      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#dceddb] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#faebd6] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />

      <div className="relative z-10 mx-auto max-w-[1180px] pt-8 px-4 md:px-8">

        {/* COMPACT AUTH HEADER */}
        <div className="flex justify-center md:justify-between items-center mb-16 md:mb-24">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="bg-[#0f766e] text-white w-10 h-10 flex items-center justify-center rounded-md font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              H
            </div>
            <span className="font-bold text-[18px] tracking-tight font-display">Helplytics AI</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            <Link href="/" className={navItemClass('/')}>Home</Link>
            <Link href="/explore" className={navItemClass('/explore')}>Explore</Link>
            <Link href="/leaderboard" className={navItemClass('/leaderboard')}>Leaderboard</Link>
          </nav>
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT HERO CARD */}
          <div className="bg-[#112322] text-[#e8f1f0] rounded-[48px] p-10 md:p-14 shadow-2xl relative overflow-hidden h-full flex flex-col justify-center min-h-[540px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#0f766e]/30 to-transparent rounded-full blur-3xl opacity-60"></div>

            <div className="relative z-10">
              <p className="eyebrow !text-[#9ccbcb] mb-6 uppercase tracking-widest text-[12px] font-bold">COMMUNITY ACCESS</p>
              <h1 className="text-[44px] md:text-[56px] font-extrabold text-white leading-[1.05] tracking-tighter mb-8 font-display">
                Enter the support network.
              </h1>
              <p className="text-[#a4bcbb] text-[17px] leading-relaxed font-semibold opacity-90 mb-10 max-w-md">
                Choose a demo identity, set your role, and jump into a multi-page product flow designed for asking, offering, and tracking help with a premium interface.
              </p>

              <ul className="space-y-5 text-[#9ccbcb] font-bold text-[15px]">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0f766e] shrink-0" />
                  <span>Role-based entry for Need Help, Can Help, or Both</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0f766e] shrink-0" />
                  <span>Direct path into dashboard, requests, AI Center, and community feed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0f766e] shrink-0" />
                  <span>Persistent demo session powered by LocalStorage</span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT AUTH FORM */}
          <div className="flex justify-center lg:justify-end">
            <Suspense fallback={
              <div className="bg-white rounded-[40px] p-10 md:p-14 border border-[#1a1f1d]/5 shadow-2xl w-full max-w-[540px] h-[600px] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#0f766e] border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <AuthForm />
            </Suspense>
          </div>

        </main>

        {/* Footer */}
        <div className="mt-28 border-t flex justify-center border-[#f0eee9] pt-8 pb-4 relative z-10 text-center">
          <p className="text-[12px] text-[#778077] font-semibold">
            Helplytics AI Auth protocols ensure secure session persistence across your session.
          </p>
        </div>

      </div>
    </div>
  );
}
