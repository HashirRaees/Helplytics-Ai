"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { HelpRequest } from "@/lib/types";
import { Header } from "@/components/layout/Header";

export default function RequestDetailPage() {
  const params = useParams<{ id: string }>();
  const [request, setRequest] = useState<HelpRequest | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    api.getRequest(params.id).then((response) => setRequest(response.data.request));
  }, [params.id]);

  async function handleHelp() {
    if (!request) return;
    await api.offerHelp(request._id, note);
  }

  async function handleSolved(helperId?: string) {
    if (!request) return;
    await api.markSolved(request._id, helperId);
  }

  return (
    <div className="min-h-screen text-[#1c1a17] bg-[#fdfaf5] font-sans selection:bg-[#0f766e]/20 relative overflow-hidden pb-20">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#dceddb] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#faebd6] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />

      <div className="relative z-10 mx-auto max-w-[1180px] pt-8 px-4 md:px-8">
        
        <Header />

        <div className="bg-[#1d2d2a] text-[#e8f1f0] rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#0f766e]/20 to-transparent rounded-full blur-3xl opacity-50"></div>
          <div className="relative z-10">
            <div className="eyebrow !text-[#9ccbcb] mb-4">REQUEST DETAIL</div>
            <h1 className="text-4xl md:text-[52px] font-extrabold text-white leading-[1.05] tracking-tighter mb-4 font-display">
              {request?.title || "Fetching context..."}
            </h1>
            <p className="text-[#a4bcbb] text-[16px] leading-relaxed max-w-2xl font-semibold opacity-90">
              {request?.aiInsight || "Analyzing the problem for better community matching."}
            </p>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] items-start">
          <section className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 md:p-10 border border-[#1a1f1d]/5 shadow-sm space-y-8">
            <div className="flex flex-wrap gap-3">
              <span className="px-5 py-2 bg-white text-[12px] font-bold text-[#0f766e] rounded-full border border-[#1a1f1d]/5 shadow-sm">{request?.category || "Category"}</span>
              <span className="px-5 py-2 bg-white text-[12px] font-bold text-[#b45309] rounded-full border border-[#1a1f1d]/5 shadow-sm">{request?.urgency || "medium"}</span>
              <span className="px-5 py-2 bg-white text-[12px] font-bold text-[#5f685f] rounded-full border border-[#1a1f1d]/5 shadow-sm">{request?.location || "Remote"}</span>
            </div>
            
            <p className="text-[16px] font-semibold leading-[1.8] text-[#1a1f1d] opacity-90">{request?.description}</p>
            
            <div className="space-y-4">
              <span className="text-[13px] text-[#5f685f] font-bold block uppercase tracking-wider">Tags</span>
              <div className="flex flex-wrap gap-2.5">
                {request?.tags.map((tag) => (
                  <span key={tag} className="px-4 py-1.5 bg-[#f0f6f5] text-[11px] font-bold text-[#0f766e] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#fffcf7] p-8 rounded-3xl border border-[#1a1f1d]/5">
              <p className="text-[13px] text-[#5f685f] font-bold mb-4 uppercase tracking-wider">Suggested skills</p>
              <div className="flex flex-wrap gap-2">
                {(request?.suggestedSkills || []).map((skill) => (
                  <span key={skill} className="px-5 py-2 bg-white text-[12px] font-bold text-[#0f766e] rounded-full shadow-sm border border-[#1a1f1d]/5">{skill}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 md:p-10 border border-[#1a1f1d]/5 shadow-sm space-y-6">
              <div className="eyebrow !text-[#0f766e]">OFFER HELP</div>
              <h2 className="text-[24px] font-extrabold tracking-tight font-display">Contribute solution</h2>
              <textarea className="w-full h-28 p-4 bg-white border border-[#1a1f1d]/10 rounded-2xl text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all placeholder:text-[#939088] resize-none" placeholder="Add a short note for the requester" value={note} onChange={(event) => setNote(event.target.value)} />
              <button 
                className="w-full h-14 bg-brand-gradient text-white font-bold rounded-full shadow-lg hover:opacity-90 transition-all"
                onClick={handleHelp}
              >
                I can help
              </button>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 md:p-10 border border-[#1a1f1d]/5 shadow-sm space-y-6">
              <div className="eyebrow !text-[#0f766e]">HELPERS</div>
              <h2 className="text-[24px] font-extrabold tracking-tight font-display">Active support</h2>
              <div className="space-y-4">
                {(request?.helpers || []).map((helper) => (
                  <div key={helper.user._id} className="bg-white rounded-[24px] p-6 border border-[#1a1f1d]/5 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[15px] font-bold text-[#1c1a17]">{helper.user.name}</p>
                        <p className="text-[12px] text-[#5f685f] font-semibold mt-1">
                          {(helper.user.profile?.skills || []).slice(0, 2).join(", ")} • Trust {helper.user.stats?.trustScore || 0}%
                        </p>
                      </div>
                      <button 
                        className="px-4 py-2 bg-[#f0f6f5] text-[11px] font-bold text-[#0f766e] rounded-full hover:bg-[#e2efed] transition-colors"
                        onClick={() => handleSolved(helper.user._id)}
                      >
                        Solved
                      </button>
                    </div>
                    {helper.note ? <p className="text-[13px] text-[#5f685f] font-semibold leading-relaxed bg-[#f9f8f4] p-3 rounded-xl italic">"{helper.note}"</p> : null}
                  </div>
                ))}
                {(!request?.helpers || request.helpers.length === 0) && (
                  <p className="text-[14px] text-[#5f685f] font-semibold text-center py-4 italic">No helpers have offered yet.</p>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-28 border-t flex justify-center border-[#f0eee9] pt-8 pb-4 relative z-10 text-center">
          <p className="text-[12px] text-[#778077] font-semibold">
            Community-driven support ensures knowledge is shared and problems are solved collaboratively.
          </p>
        </div>

      </div>
    </div>
  );
}
