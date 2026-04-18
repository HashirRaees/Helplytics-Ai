"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import { sessionStore } from "@/lib/storage";
import { SessionUser } from "@/lib/types";

const links = [
  ["/dashboard", "Dashboard"],
  ["/explore", "Explore"],
  ["/requests/new", "Create"],
  ["/messages", "Messages"],
  ["/leaderboard", "Leaderboard"],
  ["/ai-center", "AI Center"],
  ["/notifications", "Notifications"],
  ["/profile", "Profile"],
] as const;

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [user] = useState<SessionUser | null>(() => sessionStore.getUser());

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-5 md:px-8">
      <aside className="hidden w-72 shrink-0 flex-col gap-5 lg:flex">
        <div className="panel p-5">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
            Helplytics AI
          </Link>
          <div className="mt-5 rounded-[22px] bg-[var(--surface-muted)] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-soft">Signed in as</p>
            <p className="mt-2 text-lg font-semibold">{user?.name || "Demo collaborator"}</p>
            <p className="mt-1 text-sm text-soft">{user?.profile?.location || "Remote community"}</p>
          </div>
          <nav className="mt-5 flex flex-col gap-2">
            {links.map(([href, label]) => {
              const active = pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    active ? "bg-[var(--primary)] text-white" : "hover:bg-[var(--surface-muted)]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
      <div className="flex flex-1 flex-col gap-6">
        <div className="panel flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-sm font-semibold">Community support workflow</p>
            <p className="text-sm text-soft">Requests, helpers, trust score, AI insights, and messaging</p>
          </div>
          <div className="flex gap-3">
            <Link href="/auth" className="btn-secondary">Auth</Link>
            <Link href="/requests/new" className="btn-primary">New request</Link>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
