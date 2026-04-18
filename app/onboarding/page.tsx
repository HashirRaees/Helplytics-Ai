"use client";

import { OnboardingForm } from "@/components/forms/OnboardingForm";
import { Header } from "@/components/layout/Header";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen text-[#1c1a17] bg-[#fdfaf5] font-sans selection:bg-[#0f766e]/20 relative overflow-hidden pb-20">

      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#dceddb] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#faebd6] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />

      <div className="relative z-10 mx-auto max-w-[1180px] pt-8 px-4 md:px-8">

        <Header />

        <div className="mt-16 md:mt-24 max-w-4xl mx-auto space-y-12 pb-20">
          <div className="bg-[#1d2d2a] text-[#e8f1f0] rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#0f766e]/20 to-transparent rounded-full blur-3xl opacity-50"></div>
            <div className="relative z-10">
              <div className="eyebrow !text-[#9ccbcb] mb-4">ONBOARDING</div>
              <h1 className="text-4xl md:text-[52px] font-extrabold text-white leading-[1.05] tracking-tighter mb-6 font-display">
                Tell us about your expertise.
              </h1>
              <p className="text-[#a4bcbb] text-[18px] leading-relaxed font-semibold opacity-90 mx-auto max-w-2xl">
                Set up your profile to start solving community requests. Your skills are the foundation of our AI's matching intelligence.
              </p>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 md:p-12 border border-[#1a1f1d]/5 shadow-sm">
            <OnboardingForm />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-28 border-t flex justify-center border-[#f0eee9] pt-8 pb-4 relative z-10 text-center">
          <p className="text-[12px] text-[#778077] font-semibold">
            Helplytics AI onboarding takes less than 2 minutes and unlocks the full potential of community-driven support.
          </p>
        </div>

      </div>
    </div>
  );
}
