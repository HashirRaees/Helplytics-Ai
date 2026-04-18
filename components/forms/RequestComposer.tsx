"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const splitTags = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export function RequestComposer() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState("");
  const [location, setLocation] = useState("");
  const [preview, setPreview] = useState<{ category?: string; urgency?: string; tags?: string[]; suggestedSkills?: string[] }>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(async () => {
      if (description.length < 20) {
        return;
      }

      try {
        const response = await api.previewAi({ title, description });
        setPreview(response.data.preview);
      } catch {
        setPreview({});
      }
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [title, description]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await api.createRequest({
        title,
        description,
        tags: splitTags(tags),
        category: category || undefined,
        urgency: urgency || undefined,
        location,
      });

      router.push(`/requests/${response.data.request._id}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <form onSubmit={handleSubmit} className="panel space-y-4 p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">Create request</p>
          <h1 className="mt-2 text-3xl font-semibold">Ask the community for support</h1>
        </div>
        <input className="input" placeholder="Request title" value={title} onChange={(event) => setTitle(event.target.value)} />
        <textarea className="input min-h-40" placeholder="Describe the problem, context, and what kind of help you need" value={description} onChange={(event) => setDescription(event.target.value)} />
        <input className="input" placeholder="Tags, comma separated" value={tags} onChange={(event) => setTags(event.target.value)} />
        <div className="grid gap-4 md:grid-cols-3">
          <input className="input" placeholder="Category" value={category} onChange={(event) => setCategory(event.target.value)} />
          <select className="input" value={urgency} onChange={(event) => setUrgency(event.target.value)}>
            <option value="">Let AI detect urgency</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input className="input" placeholder="Location" value={location} onChange={(event) => setLocation(event.target.value)} />
        </div>
        <button className="btn-primary w-full" disabled={submitting}>
          {submitting ? "Publishing..." : "Publish request"}
        </button>
      </form>

      <div className="panel space-y-4 p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">AI helper</p>
          <h2 className="mt-2 text-2xl font-semibold">Live suggestions</h2>
        </div>
        <div className="soft-panel p-4">
          <p className="text-sm text-soft">Suggested category</p>
          <p className="mt-2 text-lg font-semibold">{preview.category || "Waiting for enough detail..."}</p>
        </div>
        <div className="soft-panel p-4">
          <p className="text-sm text-soft">Suggested urgency</p>
          <p className="mt-2 text-lg font-semibold">{preview.urgency || "Medium"}</p>
        </div>
        <div className="soft-panel p-4">
          <p className="text-sm text-soft">Suggested tags</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(preview.tags || ["career", "support", "community"]).map((tag) => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>
        </div>
        <div className="soft-panel p-4">
          <p className="text-sm text-soft">Recommended skills</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(preview.suggestedSkills || ["mentoring", "problem solving"]).map((skill) => (
              <span key={skill} className="chip bg-[rgba(245,158,11,0.12)] text-amber-700">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
