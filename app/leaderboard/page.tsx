"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell/AppShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { api } from "@/lib/api";

type Leader = {
  _id: string;
  name: string;
  role: string;
  profile: { location?: string; skills?: string[] };
  stats: { trustScore: number; requestsHelped: number };
  badges: string[];
};

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    api.getLeaderboard().then((response) => setLeaders(response.data.leaders));
  }, []);

  return (
    <AppShell>
      <SectionHeading eyebrow="Leaderboard" title="Top community helpers" body="Trust score increases when helpers contribute to solved requests." />
      <div className="space-y-4">
        {leaders.map((leader, index) => (
          <div key={leader._id} className="panel flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-lg font-semibold">
                #{index + 1}
              </div>
              <div>
                <p className="text-xl font-semibold">{leader.name}</p>
                <p className="text-sm text-soft">
                  {leader.profile.location} • {leader.role}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="chip">Trust {leader.stats.trustScore}</span>
              <span className="chip bg-[rgba(245,158,11,0.12)] text-amber-700">
                {leader.stats.requestsHelped} helped
              </span>
              {leader.badges.map((badge) => (
                <span key={badge} className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-soft">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
