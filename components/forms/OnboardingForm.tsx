"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { sessionStore } from "@/lib/storage";
import { UserRole } from "@/lib/types";

const splitList = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export function OnboardingForm() {
  const router = useRouter();
  const currentUser = sessionStore.getUser();
  const [name, setName] = useState(currentUser?.name || "");
  const [role, setRole] = useState<UserRole>(currentUser?.role || "both");
  const [skills, setSkills] = useState(currentUser?.profile?.skills?.join(", ") || "");
  const [interests, setInterests] = useState(currentUser?.profile?.interests?.join(", ") || "");
  const [location, setLocation] = useState(currentUser?.profile?.location || "");
  const [headline, setHeadline] = useState(currentUser?.profile?.headline || "");
  const [bio, setBio] = useState(currentUser?.profile?.bio || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.updateOnboarding({
        name,
        role,
        skills: splitList(skills),
        interests: splitList(interests),
        location,
        headline,
        bio,
      });

      const token = sessionStore.getToken();
      if (token) {
        sessionStore.save(token, response.data.user);
      }

      router.push("/dashboard");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to save onboarding");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel space-y-4 p-7">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">Onboarding</p>
        <h1 className="mt-2 text-3xl font-semibold">Shape your support profile</h1>
      </div>
      <input className="input" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
      <input className="input" placeholder="Headline" value={headline} onChange={(event) => setHeadline(event.target.value)} />
      <textarea className="input min-h-28" placeholder="Short bio" value={bio} onChange={(event) => setBio(event.target.value)} />
      <select className="input" value={role} onChange={(event) => setRole(event.target.value as UserRole)}>
        <option value="need_help">Need help</option>
        <option value="can_help">Can help</option>
        <option value="both">Both</option>
      </select>
      <input className="input" placeholder="Skills, comma separated" value={skills} onChange={(event) => setSkills(event.target.value)} />
      <input className="input" placeholder="Interests, comma separated" value={interests} onChange={(event) => setInterests(event.target.value)} />
      <input className="input" placeholder="Location" value={location} onChange={(event) => setLocation(event.target.value)} />
      {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
      <button className="btn-primary w-full" disabled={loading}>
        {loading ? "Saving..." : "Complete onboarding"}
      </button>
    </form>
  );
}
