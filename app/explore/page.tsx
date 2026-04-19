"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { api } from "@/lib/api";
import { HelpRequest } from "@/lib/types";
import { Header } from "@/components/layout/Header";

export default function ExplorePage() {
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    urgency: "",
    skills: "",
    location: "",
  });

  useEffect(() => {
    const search = new URLSearchParams(
      Object.entries(filters).filter(([, value]) => value)
    ).toString();

    api.getRequests(search ? `?${search}` : "")
      .then((response) => setRequests(response.data.requests))
      .catch(err => console.error("Failed to fetch requests", err));
  }, [filters]);

  return (
    <div className="min-h-screen text-[#1c1a17] bg-[#fdfaf5] font-sans selection:bg-[#0f766e]/20 relative overflow-x-hidden pb-20">

      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#dceddb] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#faebd6] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />

      <div className="relative z-10 mx-auto max-w-[1180px] pt-8 px-4 md:px-8">

        {/* HEADER */}
        <Header />

        {/* HERO CARD */}
        <div className="bg-[#112322] text-[#e8f1f0] rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#0f766e]/20 to-transparent rounded-full blur-3xl opacity-50"></div>
          <div className="relative z-10">
            <div className="eyebrow !text-[#9ccbcb] mb-4">EXPLORE / FEED</div>
            <h1 className="text-4xl md:text-[52px] font-extrabold text-white leading-[1.05] tracking-tighter mb-4 font-display">
              Browse help requests with filterable community context.
            </h1>
            <p className="text-[#a4bcbb] text-[16px] leading-relaxed max-w-2xl font-semibold opacity-90">
              Filter by category, urgency, skills, and location to surface the best matches across the mentor and peer support network.
            </p>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.4fr] gap-x-12 items-start">

          {/* SIDEBAR (Filters) */}
          <div className="sticky top-8 bg-white/60 backdrop-blur-md rounded-[32px] p-8 border border-[#1a1f1d]/5 shadow-sm space-y-8">
            <div>
              <div className="eyebrow mb-3">FILTERS</div>
              <h2 className="text-[28px] font-extrabold tracking-tight font-display text-[#1c1a17]">Refine the feed</h2>
            </div>

            <div className="space-y-6">
              {/* Category */}
              <div className="space-y-2">
                <label className="text-[13px] text-[#5f685f] font-bold">Category</label>
                <select
                  className="w-full h-14 px-4 bg-white border border-[#1a1f1d]/10 rounded-2xl text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all appearance-none cursor-pointer"
                  value={filters.category}
                  onChange={(e) => setFilters(f => ({ ...f, category: e.target.value }))}
                >
                  <option value="">All categories</option>
                  <option value="web-development">Web Development</option>
                  <option value="design">Design</option>
                  <option value="career">Career</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Urgency */}
              <div className="space-y-2">
                <label className="text-[13px] text-[#5f685f] font-bold">Urgency</label>
                <select
                  className="w-full h-14 px-4 bg-white border border-[#1a1f1d]/10 rounded-2xl text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all appearance-none cursor-pointer"
                  value={filters.urgency}
                  onChange={(e) => setFilters(f => ({ ...f, urgency: e.target.value }))}
                >
                  <option value="">All urgency levels</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <label className="text-[13px] text-[#5f685f] font-bold">Skills</label>
                <input
                  type="text"
                  placeholder="React, Figma, Git/GitHub"
                  className="w-full h-14 px-4 bg-white border border-[#1a1f1d]/10 rounded-2xl text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all"
                  value={filters.skills}
                  onChange={(e) => setFilters(f => ({ ...f, skills: e.target.value }))}
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-[13px] text-[#5f685f] font-bold">Location</label>
                <input
                  type="text"
                  placeholder="Karachi, Lahore, Remote"
                  className="w-full h-14 px-4 bg-white border border-[#1a1f1d]/10 rounded-2xl text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all"
                  value={filters.location}
                  onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* MAIN FEED */}
          <div className="space-y-6 mt-8 lg:mt-0">
            {requests.length > 0 ? (
              requests.map((request) => (
                <div key={request._id} className="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#f4f2ea] hover:shadow-md transition-shadow">
                  {/* Card Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3.5 py-1.5 text-[10.5px] font-bold tracking-wide rounded-full bg-[#f0f6f5] text-[#0f766e]">{request.category || "General"}</span>
                    <span className={`px-3.5 py-1.5 text-[10.5px] font-bold tracking-wide rounded-full ${request.urgency === 'high' ? 'bg-[#fee8e8] text-[#c81e1e]' :
                      request.urgency === 'medium' ? 'bg-[#fff7e6] text-[#b45309]' :
                        'bg-[#f0f9ff] text-[#0284c7]'
                      }`}>
                      {request.urgency === 'high' ? 'High' : request.urgency === 'medium' ? 'Medium' : 'Low'}
                    </span>
                    <span className={`px-3.5 py-1.5 text-[10.5px] font-bold tracking-wide rounded-full ${request.status === 'solved' ? 'bg-[#e8f7ec] text-[#1c813f]' : 'bg-[#f4f1f0] text-[#716e68]'
                      }`}>
                      {request.status === 'solved' ? 'Solved' : 'Open'}
                    </span>
                  </div>

                  <h3 className="text-[22px] font-bold tracking-tight leading-[1.25] mb-3 text-[#1c1a17] font-display">
                    {request.title}
                  </h3>
                  <p className="text-[15px] text-[#5f685f] font-semibold leading-relaxed mb-8 line-clamp-2">
                    {request.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {(request.tags || []).map(tag => (
                      <span key={tag} className="px-3.5 py-1.5 bg-[#f0f6f5] text-[10px] font-bold tracking-wide text-[#0f766e] rounded-full uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-[#1a1f1d]/5 pt-6 mt-auto gap-6">
                    <div className="flex flex-col">
                      <div className="font-bold text-[15px] text-[#1c1a17] tracking-tight">{request.createdBy?.name || "Member"}</div>
                      <div className="text-[12px] text-[#5f685f] font-semibold">
                        {request.location || "Community"} • {request.helpers?.length || 0} helper interested
                      </div>
                    </div>
                    <Link href={`/requests/${request._id}`} className="w-full md:w-auto px-6 py-[12px] bg-[#f9f8f6] text-[#1c1a17] text-[13.5px] font-bold rounded-xl shadow-sm transition-colors shrink-0 border border-[#1a1f1d]/5 hover:bg-gray-50 text-center leading-[1.1] tracking-tight">
                      Open details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-20 text-center border border-[#1a1f1d]/5">
                <p className="text-xl font-bold font-display text-[#1c1a17]">No requests found matching your filters.</p>
                <p className="text-[#5f685f] mt-2 font-semibold">Try adjusting your refine parameters or browse the full feed.</p>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="mt-28 border-t flex justify-center border-[#f0eee9] pt-8 pb-4 relative z-10">
          <p className="text-[12px] text-[#778077] font-semibold text-center">
            Helplytics AI Explore Feed is optimized for discoverability and fast community context matching.
          </p>
        </div>

      </div>
    </div>
  );
}
