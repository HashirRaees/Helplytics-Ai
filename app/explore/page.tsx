"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell/AppShell";
import { RequestCard } from "@/components/cards/RequestCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { api } from "@/lib/api";
import { HelpRequest } from "@/lib/types";

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

    api.getRequests(search ? `?${search}` : "").then((response) => setRequests(response.data.requests));
  }, [filters]);

  const countLabel = useMemo(() => `${requests.length} requests`, [requests.length]);

  return (
    <AppShell>
      <SectionHeading
        eyebrow="Explore"
        title="Browse community requests"
        body="Filter by category, urgency, skills, and location to find requests that fit your strengths."
        action={<span className="chip">{countLabel}</span>}
      />

      <div className="panel grid gap-4 p-5 md:grid-cols-4">
        <input className="input" placeholder="Category" value={filters.category} onChange={(event) => setFilters((prev) => ({ ...prev, category: event.target.value }))} />
        <select className="input" value={filters.urgency} onChange={(event) => setFilters((prev) => ({ ...prev, urgency: event.target.value }))}>
          <option value="">All urgency</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input className="input" placeholder="Skills" value={filters.skills} onChange={(event) => setFilters((prev) => ({ ...prev, skills: event.target.value }))} />
        <input className="input" placeholder="Location" value={filters.location} onChange={(event) => setFilters((prev) => ({ ...prev, location: event.target.value }))} />
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <RequestCard key={request._id} request={request} />
        ))}
      </div>
    </AppShell>
  );
}
