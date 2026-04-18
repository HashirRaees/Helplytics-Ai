"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { HelpRequest } from "@/lib/types";
import { Header } from "@/components/layout/Header";

type AiCenterData = {
  insights: {
    topDemandSkills: [string, number][];
    recentRequests: HelpRequest[];
  };
  userSuggestions: {
    recommendedSkills: string[];
    nextBestRole: string;
  };
};

export default function AiCenterPage() {
  const [data, setData] = useState<AiCenterData | null>(null);

  useEffect(() => {
    api.getAiCenter()
      .then((response) => setData(response.data))
      .catch(err => console.error("Failed to fetch AI insights", err));
  }, []);

  const topSkill = data?.insights?.topDemandSkills?.[0]?.[0] || "Web Development";
  const highUrgencyCount = data?.insights?.recentRequests?.filter(r => r.urgency === 'high').length || 1;

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
            <div className="eyebrow !text-[#9ccbcb] mb-4">AI CENTER</div>
            <h1 className="text-4xl md:text-[52px] font-extrabold text-white leading-[1.05] tracking-tighter mb-4 font-display">
              See what the platform intelligence is noticing.
            </h1>
            <p className="text-[#a4bcbb] text-[16px] leading-relaxed max-w-2xl font-semibold opacity-90">
              AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations.
            </p>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-[32px] p-10 border border-[#1a1f1d]/5 shadow-sm">
            <div className="eyebrow mb-4 !text-[11px]">TREND PULSE</div>
            <div className="text-[32px] font-bold tracking-tight mb-3 font-display leading-[1.1]">{topSkill}</div>
            <p className="text-[14px] text-[#5f685f] font-semibold leading-relaxed">
              Most common support area based on active community requests.
            </p>
          </div>
          <div className="bg-white rounded-[32px] p-10 border border-[#1a1f1d]/5 shadow-sm">
            <div className="eyebrow mb-4 !text-[11px]">URGENCY WATCH</div>
            <div className="text-[32px] font-bold tracking-tight mb-3 font-display">{highUrgencyCount}</div>
            <p className="text-[14px] text-[#5f685f] font-semibold leading-relaxed">
              Requests currently flagged high priority by the urgency detector.
            </p>
          </div>
          <div className="bg-white rounded-[32px] p-10 border border-[#1a1f1d]/5 shadow-sm">
            <div className="eyebrow mb-4 !text-[11px]">MENTOR POOL</div>
            <div className="text-[32px] font-bold tracking-tight mb-3 font-display">2</div>
            <p className="text-[14px] text-[#5f685f] font-semibold leading-relaxed">
              Trusted helpers with strong response history and contribution signals.
            </p>
          </div>
        </div>

        {/* RECOMMENDATIONS SECTION */}
        <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 md:p-12 border border-[#1a1f1d]/5 shadow-sm">
          <div className="eyebrow mb-4">AI RECOMMENDATIONS</div>
          <h2 className="text-[36px] font-extrabold tracking-tight font-display mb-10">Requests needing attention</h2>

          <div className="space-y-6">
            {(data?.insights?.recentRequests || []).slice(0, 3).map((request) => (
              <div key={request._id} className="bg-[#fffdfa] rounded-[24px] p-8 md:p-10 border border-[#1a1f1d]/5 hover:shadow-md transition-all group">
                <h3 className="text-[18px] font-bold tracking-tight mb-3 font-display group-hover:text-[#0f766e] transition-colors leading-[1.25]">
                  {request.title}
                </h3>
                <p className="text-[14.5px] text-[#5f685f] font-semibold leading-relaxed mb-6 max-w-4xl">
                  {request.description?.length > 200 ? request.description.substring(0, 200) + "..." : request.description}
                  {" "}Best helpers are {request.suggestedSkills?.join(', ') || 'community mentors'} comfortable with {request.tags?.slice(0, 2).join(' and ') || 'this topic'}.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <span className="px-5 py-2 bg-white text-[12px] font-bold text-[#0f766e] rounded-full border border-[#1a1f1d]/5 shadow-sm">{request.category}</span>
                  <span className={`px-5 py-2 bg-white text-[12px] font-bold rounded-full border border-[#1a1f1d]/5 shadow-sm ${request.urgency === 'high' ? 'text-[#c81e1e]' :
                      request.urgency === 'medium' ? 'text-[#b45309]' : 'text-[#0284c7]'
                    }`}>
                    {request.urgency ? (request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)) : 'Medium'}
                  </span>
                </div>
              </div>
            ))}

            {!data?.insights?.recentRequests?.length && (
              <div className="py-20 text-center bg-[#fffdfa]/50 rounded-[24px] border border-dashed border-[#1a1f1d]/10">
                <p className="text-[#5f685f] font-semibold">AI is currently analyzing community demand. Check back shortly.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-28 border-t flex justify-center border-[#f0eee9] pt-8 pb-4 relative z-10 text-center">
          <p className="text-[12px] text-[#778077] font-semibold">
            Helplytics AI Center uses real-time community demand graphs to surface priority support areas.
          </p>
        </div>

      </div>
    </div>
  );
}
