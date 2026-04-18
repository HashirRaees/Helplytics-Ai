"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { sessionStore } from "@/lib/storage";
import { UserRole } from "@/lib/types";

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("both");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetToken = useMemo(() => searchParams.get("resetToken"), [searchParams]);

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
      router.push("/onboarding");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to continue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel w-full max-w-xl p-7 md:p-9">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">Access</p>
          <h1 className="mt-2 text-3xl font-semibold">Join the Helplytics network</h1>
        </div>
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="btn-secondary"
        >
          {mode === "login" ? "Need account?" : "Have account?"}
        </button>
      </div>

      {resetToken ? (
        <div className="mt-6 rounded-[18px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Reset token detected in the URL. The backend already supports reset-password flows, so you can wire a dedicated screen next if needed.
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {mode === "signup" ? (
          <input className="input" placeholder="Full name" value={name} onChange={(event) => setName(event.target.value)} />
        ) : null}
        <input className="input" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />

        {mode === "signup" ? (
          <select className="input" value={role} onChange={(event) => setRole(event.target.value as UserRole)}>
            <option value="need_help">I mostly need help</option>
            <option value="can_help">I mostly help others</option>
            <option value="both">I do both</option>
          </select>
        ) : null}

        {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}

        <button className="btn-primary w-full" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
        </button>
      </form>
    </div>
  );
}
