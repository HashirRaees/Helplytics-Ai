"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell/AppShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { api } from "@/lib/api";
import { HelpRequest } from "@/lib/types";

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
    <AppShell>
      <SectionHeading
        eyebrow="Request detail"
        title={request?.title || "Loading request..."}
        body={request?.aiInsight}
      />

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="panel space-y-5 p-7">
          <div className="flex flex-wrap gap-2">
            <span className="chip">{request?.category || "Category"}</span>
            <span className="chip bg-[rgba(245,158,11,0.12)] text-amber-700">{request?.urgency || "medium"}</span>
            <span className="chip bg-[var(--surface-muted)] text-[var(--text)]">{request?.location || "Remote"}</span>
          </div>
          <p className="text-base leading-8 text-soft">{request?.description}</p>
          <div className="flex flex-wrap gap-2">
            {request?.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-soft">
                {tag}
              </span>
            ))}
          </div>
          <div className="soft-panel p-5">
            <p className="text-sm text-soft">Suggested skills</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(request?.suggestedSkills || []).map((skill) => (
                <span key={skill} className="chip">{skill}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="panel space-y-4 p-6">
            <h2 className="text-2xl font-semibold">Offer help</h2>
            <textarea className="input min-h-28" placeholder="Add a short note for the requester" value={note} onChange={(event) => setNote(event.target.value)} />
            <button className="btn-primary w-full" onClick={handleHelp}>
              I can help
            </button>
          </div>
          <div className="panel space-y-4 p-6">
            <h2 className="text-2xl font-semibold">Helpers</h2>
            {(request?.helpers || []).map((helper) => (
              <div key={helper.user._id} className="soft-panel p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">{helper.user.name}</p>
                    <p className="text-sm text-soft">
                      {(helper.user.profile?.skills || []).join(", ")} • trust {helper.user.stats?.trustScore || 0}
                    </p>
                  </div>
                  <button className="btn-secondary" onClick={() => handleSolved(helper.user._id)}>
                    Mark as solved
                  </button>
                </div>
                {helper.note ? <p className="mt-3 text-sm text-soft">{helper.note}</p> : null}
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
