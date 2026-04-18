"use client";

import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { sessionStore } from "@/lib/storage";
import { SessionUser } from "@/lib/types";

const asText = (list?: string[]) => (list && list.length ? list.join(", ") : "");

export function ProfileEditor() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getProfile().then((response) => setUser(response.data.user));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;

    const formData = new FormData(event.currentTarget);
    setLoading(true);

    const response = await api.updateProfile({
      name: formData.get("name"),
      role: formData.get("role"),
      headline: formData.get("headline"),
      bio: formData.get("bio"),
      skills: String(formData.get("skills") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      interests: String(formData.get("interests") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      location: formData.get("location"),
      availability: formData.get("availability"),
    });

    const token = sessionStore.getToken();
    if (token) {
      sessionStore.save(token, response.data.user);
    }

    setUser(response.data.user);
    setLoading(false);
  }

  if (!user) {
    return <div className="panel p-7">Loading profile...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="panel space-y-4 p-7">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-(--primary)">Profile</p>
        <h1 className="mt-2 text-3xl font-semibold">{user.name}</h1>
      </div>
      <input className="input" name="name" defaultValue={user.name} placeholder="Name" />
      <input className="input" name="headline" defaultValue={user.profile?.headline} placeholder="Headline" />
      <textarea className="input min-h-28" name="bio" defaultValue={user.profile?.bio} placeholder="Bio" />
      <select className="input" name="role" defaultValue={user.role}>
        {["need_help", "can_help", "both"].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <input className="input" name="skills" defaultValue={asText(user.profile?.skills)} placeholder="Skills" />
      <input className="input" name="interests" defaultValue={asText(user.profile?.interests)} placeholder="Interests" />
      <input className="input" name="location" defaultValue={user.profile?.location} placeholder="Location" />
      <input className="input" name="availability" defaultValue={user.profile?.availability} placeholder="Availability" />
      <button className="btn-primary w-full" disabled={loading}>
        {loading ? "Updating..." : "Save changes"}
      </button>
      <div className="soft-panel p-4">
        <p className="text-sm text-soft">Trust score</p>
        <p className="mt-2 text-2xl font-semibold">{user.stats?.trustScore || 0}</p>
      </div>
    </form>
  );
}
