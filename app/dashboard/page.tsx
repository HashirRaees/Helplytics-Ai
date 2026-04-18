"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { api } from "@/lib/api";
import { DashboardData, SessionUser } from "@/lib/types";
import { sessionStore } from "@/lib/storage";
import { Header } from "@/components/layout/Header";
export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    setUser(sessionStore.getUser());
    api.getDashboard()
      .then((response) => setData(response.data))
      .catch(err => console.error("Failed to fetch dashboard data", err));
  }, []);

  return (
    <div className="min-h-screen text-[#1c1a17] bg-[#fdfaf5] font-sans selection:bg-[#0f766e]/20 relative overflow-hidden pb-20">

      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#dceddb] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#faebd6] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />

      <div className="relative z-10 mx-auto max-w-[1180px] pt-8 px-4 md:px-8">

        {/* HEADER */}
        <Header />

        {/* WELCOME HERO */}
        <div className="bg-[#1d2d2a] text-[#e8f1f0] rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#0f766e]/20 to-transparent rounded-full blur-3xl opacity-50"></div>
          <div className="relative z-10">
            <div className="eyebrow !text-[#9ccbcb] mb-4">DASHBOARD</div>
            <h1 className="text-4xl md:text-[52px] font-extrabold text-white leading-[1.05] tracking-tighter mb-4 font-display">
              Welcome back, {user?.name.split(' ')[0] || 'Member'}.
            </h1>
            <p className="text-[#a4bcbb] text-[16px] leading-relaxed max-w-2xl font-semibold opacity-90">
              Your command center for requests, AI insights, helper momentum, and live community activity.
            </p>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          <div className="bg-white rounded-[32px] p-8 border border-[#1a1f1d]/5 shadow-sm">
            <div className="eyebrow mb-3 !text-[10px]">TRUST SCORE</div>
            <div className="text-3xl font-bold tracking-tight mb-2 font-display">{data?.stats.trustScore || 0}%</div>
            <p className="text-[12px] text-[#5f685f] font-semibold leading-relaxed">
              Driven by solved requests and consistent support.
            </p>
          </div>
          <div className="bg-white rounded-[32px] p-8 border border-[#1a1f1d]/5 shadow-sm">
            <div className="eyebrow mb-3 !text-[10px]">HELPING</div>
            <div className="text-3xl font-bold tracking-tight mb-2 font-display">{data?.stats.requestsHelped || 0}</div>
            <p className="text-[12px] text-[#5f685f] font-semibold leading-relaxed">
              Requests where you are currently listed as a helper.
            </p>
          </div>
          <div className="bg-white rounded-[32px] p-8 border border-[#1a1f1d]/5 shadow-sm">
            <div className="eyebrow mb-3 !text-[10px]">OPEN REQUESTS</div>
            <div className="text-3xl font-bold tracking-tight mb-2 font-display">{data?.stats.requestsCreated || 0}</div>
            <p className="text-[12px] text-[#5f685f] font-semibold leading-relaxed">
              Community requests currently active across the feed.
            </p>
          </div>
          <div className="bg-white rounded-[32px] p-8 border border-[#1a1f1d]/5 shadow-sm">
            <div className="eyebrow mb-3 !text-[10px]">AI PULSE</div>
            <div className="text-3xl font-bold tracking-tight mb-2 font-display">1 trends</div>
            <p className="text-[12px] text-[#5f685f] font-semibold leading-relaxed">
              Trend count detected in the latest request activity.
            </p>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-x-12 items-start">

          {/* LEFT: Recent Requests */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-8">
              <div>
                <div className="eyebrow mb-3">RECENT REQUESTS</div>
                <h2 className="text-[28px] font-extrabold tracking-tight font-display">What the community needs right now</h2>
              </div>
              <Link href="/explore" className="px-6 py-3 bg-white border border-[#1a1f1d]/10 rounded-full text-[13px] font-bold shadow-sm hover:shadow-md transition-all text-center">
                Go to feed
              </Link>
            </div>

            <div className="space-y-6">
              {(data?.recentRequests || []).map((request) => (
                <div key={request._id} className="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#f4f2ea]">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3.5 py-1.5 text-[10.5px] font-bold tracking-wide rounded-full bg-[#f0f6f5] text-[#0f766e]">{request.category}</span>
                    <span className={`px-3.5 py-1.5 text-[10.5px] font-bold tracking-wide rounded-full ${request.urgency === 'high' ? 'bg-[#fee8e8] text-[#c81e1e]' : 'bg-[#f0f9ff] text-[#0284c7]'}`}>{request.urgency === 'high' ? 'High' : 'Normal'}</span>
                    <span className="px-3.5 py-1.5 text-[10.5px] font-bold tracking-wide rounded-full bg-[#f4f1f0] text-[#716e68]">Open</span>
                  </div>
                  <h3 className="text-[20px] font-bold tracking-tight leading-snug mb-3 font-display">{request.title}</h3>
                  <p className="text-[14px] text-[#5f685f] font-semibold mb-8 line-clamp-2">{request.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {request.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-3.5 py-1.5 bg-[#f0f6f5] text-[10px] font-bold tracking-wide text-[#0f766e] rounded-full uppercase">{tag}</span>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-6 border-t border-[#1a1f1d]/5 gap-6">
                    <div>
                      <div className="font-bold text-[14px]">{request.createdBy.name}</div>
                      <div className="text-[11.5px] text-[#5f685f] font-semibold">{request.location} • {request.helpers.length} helper interested</div>
                    </div>
                    <Link href={`/requests/${request._id}`} className="w-full md:w-auto px-5 py-2.5 bg-[#f9f8f6] border border-[#1a1f1d]/10 rounded-xl text-[13px] font-bold text-center">
                      Open details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: AI Insights & Notifications */}
          <div className="space-y-8 mt-16 lg:mt-0">
            {/* AI Insights Panel */}
            <div className="bg-[#fffcf7] rounded-[32px] p-8 border border-[#1a1f1d]/5 shadow-sm">
              <div className="eyebrow mb-3 !text-[#0f766e]">AI INSIGHTS</div>
              <h2 className="text-[20px] font-bold tracking-tight font-display mb-8">Suggested actions for you</h2>

              <div className="space-y-5">
                <div className="flex justify-between items-center py-3 border-b border-[#1a1f1d]/5">
                  <span className="text-[13.5px] text-[#5f685f] font-semibold">Most requested category</span>
                  <span className="text-[13.5px] font-bold">Web Development</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[#1a1f1d]/5">
                  <span className="text-[13.5px] text-[#5f685f] font-semibold">Your strongest trust driver</span>
                  <span className="text-[13.5px] font-bold">Design Ally</span>
                </div>
                <div className="flex justify-between items-start py-3 border-b border-[#1a1f1d]/5">
                  <span className="text-[13.5px] text-[#5f685f] font-semibold">AI says you can mentor in</span>
                  <span className="text-[13.5px] font-bold text-right">HTML/CSS, UI/UX, Career Guidance, Figma</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-[13.5px] text-[#5f685f] font-semibold">Your active requests</span>
                  <span className="text-[13.5px] font-bold">1</span>
                </div>
              </div>
            </div>

            {/* Notifications Panel */}
            <div className="bg-[#fffcf7] rounded-[32px] p-8 border border-[#1a1f1d]/5 shadow-sm">
              <div className="eyebrow mb-3 !text-[#0f766e]">NOTIFICATIONS</div>
              <h2 className="text-[20px] font-bold tracking-tight font-display mb-8">Latest updates</h2>

              <div className="space-y-4">
                <div className="bg-white rounded-[22px] p-5 shadow-sm border border-[#1a1f1d]/5 relative">
                  <p className="text-[13.5px] font-bold mb-1 max-w-[85%]">New helper matched to your responsive portfolio request</p>
                  <p className="text-[12px] text-[#5f685f] font-semibold">Match • 12 min ago</p>
                  <span className="absolute top-5 right-5 px-2.5 py-1 bg-[#fee8e8] text-[#c81e1e] text-[10px] font-bold rounded-md">Unread</span>
                </div>
                <div className="bg-white rounded-[22px] p-5 shadow-sm border border-[#1a1f1d]/5 relative">
                  <p className="text-[13.5px] font-bold mb-1 max-w-[85%]">Your trust score increased after a solved request</p>
                  <p className="text-[12px] text-[#5f685f] font-semibold">Reputation • 1 hr ago</p>
                  <span className="absolute top-5 right-5 px-2.5 py-1 bg-[#fee8e8] text-[#c81e1e] text-[10px] font-bold rounded-md">Unread</span>
                </div>
                <div className="bg-white rounded-[22px] p-5 shadow-sm border border-[#1a1f1d]/5 relative">
                  <p className="text-[13.5px] font-bold mb-1 max-w-[85%]">AI Center detected rising demand for interview prep</p>
                  <p className="text-[12px] text-[#5f685f] font-semibold">Insight • Today</p>
                  <span className="absolute top-5 right-5 px-2.5 py-1 bg-[#f0f9ff] text-[#0284c7] text-[10px] font-bold rounded-md">Read</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-28 border-t flex justify-center border-[#f0eee9] pt-8 pb-4 relative z-10 text-center">
          <p className="text-[12px] text-[#778077] font-semibold">
            Helplytics AI Dashboard uses advanced intelligence and community graphs to keep your support workflow focused.
          </p>
        </div>

      </div>
    </div>
  );
}
