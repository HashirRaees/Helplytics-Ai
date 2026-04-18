"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { api } from "@/lib/api";
import { sessionStore } from "@/lib/storage";
import { UserRole } from "@/lib/types";

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("both");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response =
        mode === "login"
          ? await api.login({ email, password })
          : await api.signup({ name, email, password, role });

      sessionStore.save(response.data.token, response.data.user);
      router.push("/dashboard");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to continue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-[40px] p-10 md:p-14 border border-[#1a1f1d]/5 shadow-2xl w-full max-w-[540px] relative overflow-hidden">
      
      <div className="mb-10">
        <p className="eyebrow !text-[#0f766e] mb-2 uppercase tracking-[0.2em] font-bold text-[11px]">ACCESS PORTAL</p>
        <h2 className="text-[32px] md:text-[36px] font-extrabold tracking-tight font-display text-[#1c1a17] leading-tight">
          {mode === "login" ? "Welcome back to the network" : "Join the support network"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Full Name (Only for Signup) */}
        {mode === "signup" && (
          <div className="space-y-2.5">
            <label className="text-[14px] font-bold text-[#5f685f] ml-1">Full name</label>
            <input 
              className="w-full h-14 px-5 bg-[#f9f8f4] border border-[#1a1f1d]/10 rounded-2xl text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all placeholder:text-[#939088]" 
              placeholder="e.g. Ayesha Khan" 
              value={name} 
              onChange={(event) => setName(event.target.value)} 
              required
            />
          </div>
        )}

        {/* Email Address */}
        <div className="space-y-2.5">
          <label className="text-[14px] font-bold text-[#5f685f] ml-1">Email address</label>
          <input 
            type="email"
            className="w-full h-14 px-5 bg-[#f9f8f4] border border-[#1a1f1d]/10 rounded-2xl text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all placeholder:text-[#939088]" 
            placeholder="name@example.com" 
            value={email} 
            onChange={(event) => setEmail(event.target.value)} 
            required
          />
        </div>

        {/* Role Selection */}
        <div className="space-y-2.5">
          <label className="text-[14px] font-bold text-[#5f685f] ml-1">Community role</label>
          <div className="relative">
            <select 
              className="w-full h-14 px-5 bg-[#f9f8f4] border border-[#1a1f1d]/10 rounded-2xl text-[15px] font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all cursor-pointer"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
            >
              <option value="both">Both (Need Help & Can Help)</option>
              <option value="need_help">I need help</option>
              <option value="can_help">I can help others</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 6L11 1" stroke="#1c1a17" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2.5">
          <label className="text-[14px] font-bold text-[#5f685f] ml-1">Password</label>
          <input 
            type="password"
            className="w-full h-14 px-5 bg-[#f9f8f4] border border-[#1a1f1d]/10 rounded-2xl text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all placeholder:text-[#939088]" 
            placeholder="••••••••" 
            value={password} 
            onChange={(event) => setPassword(event.target.value)} 
            required
          />
        </div>

        {error ? <p className="text-[13px] font-bold text-[#b91c1c] ml-1 bg-[#fef2f2] p-3 rounded-xl border border-[#fca5a5]/30">{error}</p> : null}

        <button 
          className="w-full h-16 bg-[#0f766e] text-white font-extrabold text-[16px] rounded-2xl shadow-xl hover:bg-[#0d6d65] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none mt-4 uppercase tracking-wider" 
          disabled={loading}
        >
          {loading ? "AUTHENTICATING..." : mode === "login" ? "Sign In" : "Create Profile"}
        </button>

        <div className="text-center mt-6">
          <button 
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-[13px] font-bold text-[#5f685f] hover:text-[#0f766e] transition-colors uppercase tracking-wider"
          >
            {mode === "login" ? "New to the network? Join here" : "Already a member? Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
}
