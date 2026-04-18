"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell/AppShell";
import { RequestCard } from "@/components/cards/RequestCard";
import { StatCard } from "@/components/cards/StatCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { api } from "@/lib/api";
import { DashboardData } from "@/lib/types";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    api.getDashboard().then((response) => setData(response.data));
  }, []);

  return (
    <AppShell>
      <SectionHeading
        eyebrow="Dashboard"
        title="Your support command center"
        body="Track what you posted, who you helped, your trust score, and where the next action is."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Requests created" value={data?.stats.requestsCreated || 0} meta="Requests you opened" />
        <StatCard label="Requests helped" value={data?.stats.requestsHelped || 0} meta="Community interventions" />
        <StatCard label="Trust score" value={data?.stats.trustScore || 0} meta="Reputation from completed support" />
        <StatCard label="Unread alerts" value={data?.stats.unreadNotifications || 0} meta="Notifications waiting" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-4">
          <SectionHeading title="Recent requests" />
          {(data?.recentRequests || []).map((request) => (
            <RequestCard key={request._id} request={request} />
          ))}
        </section>

        <section className="space-y-4">
          <SectionHeading title="Quick actions" />
          <div className="panel space-y-4 p-6">
            {[
              "Create a new request",
              "Open your conversations",
              "Check top helpers on leaderboard",
              "Review AI demand signals",
            ].map((item) => (
              <div key={item} className="soft-panel p-4 text-sm font-medium">
                {item}
              </div>
            ))}
          </div>
          <div className="panel p-6">
            <h3 className="text-xl font-semibold">Recent conversations</h3>
            <div className="mt-4 space-y-3">
              {(data?.recentMessages || []).map((conversation) => (
                <div key={conversation._id} className="soft-panel p-4">
                  <p className="font-semibold">{conversation.request?.title}</p>
                  <p className="mt-1 text-sm text-soft">
                    {conversation.participants.map((participant) => participant.name).join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
