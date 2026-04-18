"use client";

import Link from 'next/link';
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="min-h-screen text-[#1c1a17] bg-[#fdfaf5] font-sans selection:bg-[#0f766e]/20 relative overflow-hidden pb-20">

      {/* Background gradients resembling the image */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#dceddb] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#faebd6] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />

      <div className="relative z-10 mx-auto max-w-[1180px] pt-8 px-4 md:px-8">

        <Header />

        {/* HERO GRID */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-x-12 gap-y-16 items-start pb-20">

          {/* Hero Left */}
          <div className="flex flex-col justify-center">
            <div className="eyebrow md:text-left text-center mb-5">
              Smit Grand Coding Night 2026
            </div>
            <h1 className="text-4xl md:text-left text-center md:text-[66px] font-extrabold leading-[1.02] tracking-tighter mb-6 text-[#1c1a17] font-display">
              Find help faster.<br />Become help that<br />matters.
            </h1>
            <p className="text-[#64625b] md:text-left text-center text-[17px] leading-relaxed mb-10 max-w-md font-semibold">
              Helplytics AI is a community-powered support network for students, mentors, creators, and builders. Ask for help, offer help, track impact, and let AI surface smarter matches across the platform.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-16 relative z-10">
              <Link href="/ai-center" className="px-7 py-3.5 text-white! bg-brand-gradient hover:opacity-90 transition-opacity text-white font-semibold rounded-full shadow-[0_6px_20px_rgba(15,118,110,0.25)] text-sm">
                Open product demo
              </Link>
              <Link href="/requests/new" className="px-7 py-3.5 bg-white text-[#1c1a17] font-bold rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all text-sm border border-transparent">
                Post a request
              </Link>
            </div>

            {/* Stat Cards - Three in a row */}
            <div className="grid md:grid-cols-3  gap-3 md:gap-4 relative z-0">
              {/* Stat 1 */}
              <div className="bg-[#fcfaf7] rounded-3xl p-6 shadow-sm border border-[#edebe6]/60">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#7c7973] mb-3">Members</div>
                <div className="text-3xl font-semibold mb-2 text-[#1c1a17] tracking-tight">384+</div>
                <p className="text-[12px] text-[#7c7973] leading-relaxed font-semibold">
                  Students, mentors, and helpers in the loop.
                </p>
              </div>
              {/* Stat 2 */}
              <div className="bg-[#fcfaf7] rounded-3xl p-6 shadow-sm border border-[#edebe6]/60">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#7c7973] mb-3">Requests</div>
                <div className="text-3xl font-semibold mb-2 text-[#1c1a17] tracking-tight">72+</div>
                <p className="text-[12px] text-[#7c7973] leading-relaxed font-semibold">
                  Support posts shared across learning journeys.
                </p>
              </div>
              {/* Stat 3 */}
              <div className="bg-[#fcfaf7] rounded-3xl p-6 shadow-sm border border-[#edebe6]/60">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#7c7973] mb-3">Solved</div>
                <div className="text-3xl font-semibold mb-2 text-[#1c1a17] tracking-tight">69+</div>
                <p className="text-[12px] text-[#7c7973] leading-relaxed font-semibold">
                  Problems resolved through fast community action.
                </p>
              </div>
            </div>
          </div>

          {/* Hero Right Card (Dark Teal) */}
          <div className="bg-[#112322] text-[#e8f1f0] rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden h-full flex flex-col pt-12">
            <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-tr from-[#d97706] to-[#fcd34d] rounded-full blur-[1px] shadow-[0_0_80px_rgba(245,158,11,0.6)]"></div>

            <div className="relative z-10">
              <div className="eyebrow !text-[#9ccbcb] hover:!text-white transition-colors mb-4">
                Live product feel
              </div>
              <h2 className="text-3xl md:text-[44px] font-semibold text-white leading-[1.1] mb-6 tracking-tight font-display">
                More than a form.<br />More like an<br />ecosystem.
              </h2>
              <p className="text-[#a4bcbb] text-[14.5px] leading-[1.7] mb-10 pb-2 max-w-[95%] font-semibold">
                A polished multi-page experience inspired by product platforms, with AI summaries, trust scores, contribution signals, notifications, and leaderboard momentum built directly in HTML, CSS, JavaScript, and LocalStorage.
              </p>

              {/* Inner cards */}
              <div className="space-y-3.5 mt-auto">
                <div className="bg-[#edece8] text-[#1c1a17] rounded-2xl p-5 shadow-sm">
                  <h3 className="font-semibold text-[15px] mb-1 tracking-tight font-display">AI request intelligence</h3>
                  <p className="text-[13px] text-[#605d58] font-semibold leading-relaxed">
                    Auto-categorization, urgency detection, tags, rewrite suggestions, and trend snapshots.
                  </p>
                </div>

                <div className="bg-[#edece8] text-[#1c1a17] rounded-2xl p-5 shadow-sm">
                  <h3 className="font-semibold text-[15px] mb-1 tracking-tight font-display">Community trust graph</h3>
                  <p className="text-[13px] text-[#605d58] font-semibold leading-relaxed">
                    Badges, helper rankings, trust score boosts, and visible contribution history.
                  </p>
                </div>

                <div className="bg-[#edece8] text-[#1c1a17] rounded-2xl p-5 shadow-sm">
                  <h3 className="font-semibold text-[15px] mb-1 tracking-tight font-display">100%</h3>
                  <p className="text-[13px] text-[#605d58] font-semibold leading-relaxed">
                    Top trust score currently active across the sample mentor network.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CORE FLOW */}
        <div className="mt-14 relative z-10 border-t border-gray-200/40 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-1">
            <div>
              <div className="eyebrow mb-4">
                Core Flow
              </div>
              <h2 className="text-3xl md:text-[40px] font-extrabold tracking-tight text-[#1c1a17] font-display">
                From struggling alone to solving together
              </h2>
            </div>
            <div className="shrink-0">
              <Link href="/onboarding" className="inline-block w-full md:w-auto text-center px-6 py-2.5 bg-white text-[#1c1a17] font-bold text-sm rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
                Try onboarding AI
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Flow Card 1 */}
            <div className="bg-[#fcfaf7] rounded-3xl p-8 shadow-sm text-[#1c1a17] border border-[#f0eee9]">
              <h3 className="text-[17px] font-bold tracking-tight mb-2 font-display">Ask for help clearly</h3>
              <p className="text-[14px] text-[#5f685f] font-semibold leading-[1.6]">
                Create structured requests with category, urgency, AI suggestions, and tags that attract the right people.
              </p>
            </div>
            {/* Flow Card 2 */}
            <div className="bg-[#fcfaf7] rounded-3xl p-8 shadow-sm text-[#1c1a17] border border-[#f0eee9]">
              <h3 className="text-[17px] font-bold tracking-tight mb-2 font-display">Discover the right people</h3>
              <p className="text-[14px] text-[#5f685f] font-semibold leading-[1.6]">
                Use the explore feed, helper lists, notifications, and messaging to move quickly once a match happens.
              </p>
            </div>
            {/* Flow Card 3 */}
            <div className="bg-[#fcfaf7] rounded-3xl p-8 shadow-sm text-[#1c1a17] border border-[#f0eee9]">
              <h3 className="text-[17px] font-bold tracking-tight mb-2 font-display">Track real contribution</h3>
              <p className="text-[14px] text-[#5f685f] font-semibold leading-[1.6]">
                Trust scores, badges, solved requests, and rankings help the community recognize meaningful support.
              </p>
            </div>
          </div>
        </div>

        {/* FEATURED REQUESTS */}
        <div className="mt-28 relative z-10 border-t border-gray-200/40 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-1 text-[#1c1a17]">
            <div>
              <div className="eyebrow mb-4">
                Featured Requests
              </div>
              <h2 className="text-3xl md:text-[40px] font-extrabold tracking-tight font-display">
                Community problems currently in motion
              </h2>
            </div>
            <div className="shrink-0">
              <Link href="/explore" className="inline-block w-full md:w-auto text-center px-6 py-2.5 bg-white text-[#1c1a17] font-bold text-sm rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
                View full feed
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Request Card 1 */}
            <div className="bg-white rounded-3xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#f4f2ea] flex flex-col pt-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1.5 text-[10px] font-bold tracking-wide rounded-full bg-[#f0f6f5] text-[#0f766e]">Web Development</span>
                <span className="px-3 py-1.5 text-[10px] font-bold tracking-wide rounded-full bg-[#fee8e8] text-[#c81e1e]">High</span>
                <span className="px-3 py-1.5 text-[10px] font-bold tracking-wide rounded-full bg-[#e8f7ec] text-[#1c813f]">Solved</span>
              </div>
              <h3 className="text-[18px] font-bold tracking-tight leading-snug mb-2 text-[#1c1a17] font-display">Need help</h3>
              <p className="text-[14px] text-[#5f685f] flex-grow font-semibold mb-12 mt-1">
                help needed
              </p>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-auto gap-4">
                <div className="flex flex-col">
                  <div className="font-bold text-[14px] text-[#1c1a17] tracking-tight">Ayesha Khan</div>
                  <div className="text-[11.5px] text-[#5f685f] font-semibold">Karachi • 1 helper interested</div>
                </div>
                <Link href="/requests/1" className="w-full md:w-auto px-4 py-[10px] bg-[#f9f8f6] text-[#1c1a17] text-[13px] font-bold rounded-xl shadow-sm transition-colors shrink-0 border border-[#1a1f1d]/5 hover:bg-white text-center leading-[1.1] tracking-tight">
                  Open details
                </Link>
              </div>
            </div>

            {/* Request Card 2 */}
            <div className="bg-white rounded-3xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#f4f2ea] flex flex-col pt-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1.5 text-[10px] font-bold tracking-wide rounded-full bg-[#f0f6f5] text-[#0f766e]">Web Development</span>
                <span className="px-3 py-1.5 text-[10px] font-bold tracking-wide rounded-full bg-[#fee8e8] text-[#c81e1e]">High</span>
                <span className="px-3 py-1.5 text-[10px] font-bold tracking-wide rounded-full bg-[#e8f7ec] text-[#1c813f]">Solved</span>
              </div>
              <h3 className="text-[18px] font-bold tracking-tight leading-[1.25] mb-3 text-[#1c1a17] font-display">Need help making my portfolio responsive before demo day</h3>
              <p className="text-[14px] text-[#5f685f] font-semibold mb-8">
                My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3.5 py-1.5 bg-[#f0f6f5] text-[10px] font-bold tracking-wide text-[#0f766e] rounded-full">HTML/CSS</span>
                <span className="px-3.5 py-1.5 bg-[#f0f6f5] text-[10px] font-bold tracking-wide text-[#0f766e] rounded-full">Responsive</span>
                <span className="px-3.5 py-1.5 bg-[#f0f6f5] text-[10px] font-bold tracking-wide text-[#0f766e] rounded-full">Portfolio</span>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <div className="font-bold text-[14px] text-[#1c1a17] tracking-tight">Sara Noor</div>
                  <div className="text-[11.5px] text-[#5f685f] font-semibold">Karachi • 1 helper interested</div>
                </div>
                <Link href="/requests/2" className="px-4 py-[10px] bg-[#f9f8f6] text-[#1c1a17] text-[13px] font-bold rounded-xl shadow-sm transition-colors shrink-0 border border-[#1a1f1d]/5 hover:bg-white text-center leading-[1.1] tracking-tight">
                  Open<span className="text-[12px] font-bold">details</span>
                </Link>
              </div>
            </div>

            {/* Request Card 3 */}
            <div className="bg-white rounded-3xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#f4f2ea] flex flex-col pt-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1.5 text-[10px] font-bold tracking-wide rounded-full bg-[#f0f9ff] text-[#0284c7]">Design</span>
                <span className="px-3 py-1.5 text-[10px] font-bold tracking-wide rounded-full bg-[#f3f4f6] text-[#4b5563]">Medium</span>
                <span className="px-3 py-1.5 text-[10px] font-bold tracking-wide rounded-full bg-[#f9fafb] text-[#6b7280]">Open</span>
              </div>
              <h3 className="text-[18px] font-bold tracking-tight leading-[1.25] mb-3 text-[#1c1a17] font-display">Looking for Figma feedback on a volunteer event poster</h3>
              <p className="text-[14px] text-[#5f685f] font-semibold mb-8">
                I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3.5 py-1.5 bg-[#f0f6f5] text-[10px] font-bold tracking-wide text-[#0f766e] rounded-full">Figma</span>
                <span className="px-3.5 py-1.5 bg-[#f0f6f5] text-[10px] font-bold tracking-wide text-[#0f766e] rounded-full">Poster</span>
                <span className="px-3.5 py-1.5 bg-[#f0f6f5] text-[10px] font-bold tracking-wide text-[#0f766e] rounded-full">Design Review</span>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <div className="font-bold text-[14px] text-[#1c1a17] tracking-tight">Ayesha Khan</div>
                  <div className="text-[11.5px] text-[#5f685f] font-semibold">Lahore • 1 helper interested</div>
                </div>
                <Link href="/requests/3" className="px-4 py-[10px] bg-[#f9f8f6] text-[#1c1a17] text-[13px] font-bold rounded-xl shadow-sm transition-colors shrink-0 border border-[#1a1f1d]/5 hover:bg-white text-center leading-[1.1] tracking-tight">
                  Open<span className="text-[12px] font-bold">details</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-28 border-t flex justify-center border-[#f0eee9] pt-8 pb-4 text-center md:text-left relative z-10">
          <p className="text-[12px] text-[#778077] font-semibold">
            Helplytics AI is built as a premium-feel, multi-page community support product using HTML, CSS, JavaScript, and LocalStorage.
          </p>
        </div>

      </div>
    </div>
  );
}
