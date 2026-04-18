"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { api } from "@/lib/api";
import { Header } from "@/components/layout/Header";

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
    api.getLeaderboard()
      .then((response) => setLeaders(response.data.leaders))
      .catch(err => console.error("Failed to fetch leaderboard", err));
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const avatarColors = [
    'bg-[#0f766e]', // AK
    'bg-[#1d2d2a]', // HA
    'bg-[#f87171]', // SN (adjusting to reddish/orange as seen in screenshot)
  ];

  return (
    <div className="min-h-screen text-[#1c1a17] bg-[#fdfaf5] font-sans selection:bg-[#0f766e]/20 relative overflow-hidden pb-20">

      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#dceddb] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#faebd6] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />

      <div className="relative z-10 mx-auto max-w-[1180px] pt-8 px-4 md:px-8">

        <Header />

        {/* HERO CARD */}
        <div className="bg-[#1d2d2a] text-[#e8f1f0] rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#0f766e]/20 to-transparent rounded-full blur-3xl opacity-50"></div>
          <div className="relative z-10">
            <div className="eyebrow !text-[#9ccbcb] mb-4">LEADERBOARD</div>
            <h1 className="text-4xl md:text-[52px] font-extrabold text-white leading-[1.05] tracking-tighter mb-4 font-display">
              Recognize the people who keep the community moving.
            </h1>
            <p className="text-[#a4bcbb] text-[16px] leading-relaxed max-w-2xl font-semibold opacity-90">
              Trust score, contribution count, and badges create visible momentum for reliable helpers.
            </p>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-x-12 items-start">

          {/* Top Helpers (Left) */}
          <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 md:p-10 border border-[#1a1f1d]/5 shadow-sm space-y-8">
            <div>
              <div className="eyebrow mb-3">TOP HELPERS</div>
              <h2 className="text-[32px] font-extrabold tracking-tight font-display text-[#1c1a17]">Rankings</h2>
            </div>

            <div className="space-y-4">
              {leaders.slice(0, 3).map((leader, index) => (
                <div key={leader._id} className="bg-white rounded-[24px] p-6 border border-[#1a1f1d]/5 shadow-sm flex flex-col md:flex-row items-center md:items-center group hover:shadow-md transition-all gap-5">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-[15px] font-bold shrink-0 ${avatarColors[index % avatarColors.length]}`}>
                    {getInitials(leader.name)}
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[16px] font-bold text-[#1c1a17]">#{index + 1} {leader.name}</span>
                      <span className="text-[14px] font-bold text-[#1c1a17]">{leader.stats.trustScore}%</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0">
                      <span className="text-[13px] text-[#5f685f] font-semibold">{leader.profile.skills?.join(', ') || "No skills listed"}</span>
                      <span className="text-[13px] text-[#5f685f] font-semibold">{leader.stats.requestsHelped} contributions</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badge System (Right) */}
          <div className="space-y-8 mt-12 lg:mt-0">
            <div className="bg-[#fffcf7] rounded-[32px] p-8 border border-[#1a1f1d]/5 shadow-sm">
              <div className="eyebrow mb-3 !text-[#0f766e]">BADGE SYSTEM</div>
              <h2 className="text-[28px] font-extrabold tracking-tight font-display mb-8 text-[#1c1a17]">Trust and achievement</h2>

              <div className="space-y-6">
                {leaders.slice(0, 3).map((leader) => (
                  <div key={leader._id} className="space-y-3">
                    <div className="flex flex-col">
                      <span className="text-[15px] font-bold text-[#1c1a17] mb-1">{leader.name}</span>
                      <span className="text-[13px] text-[#5f685f] font-semibold">
                        {leader.badges?.join(' • ') || 'Community Contributor'}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-[#f0eee9] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#f59e0b] to-[#0f766e] rounded-full transition-all duration-1000"
                        style={{ width: `${leader.stats.trustScore}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-28 border-t flex justify-center border-[#f0eee9] pt-8 pb-4 relative z-10 text-center">
          <p className="text-[12px] text-[#778077] font-semibold">
            Helplytics AI recognition algorithm considers both solution quantity and community feedback quality.
          </p>
        </div>

      </div>
    </div>
  );
}
