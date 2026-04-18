"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell/AppShell";
import { RequestCard } from "@/components/cards/RequestCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { api } from "@/lib/api";
import { HelpRequest } from "@/lib/types";

type AiCenterData = {
  insights: {
    topDemandSkills: [string, number][];
    recentRequests: HelpRequest[];
  };
  userSuggestions: {
    recommendedSkills: string[];
    nextBestRole: string;
  };
};

export default function AiCenterPage() {
  const [data, setData] = useState<AiCenterData | null>(null);

  useEffect(() => {
    api.getAiCenter().then((response) => setData(response.data));
  }, []);

  return (
    <AppShell>
      <SectionHeading eyebrow="AI Center" title="Simple intelligence, useful outcomes" body="Keyword-based categorization, urgency detection, skill demand signals, and helper suggestions." />
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="space-y-4">
          <div className="panel p-6">
            <h2 className="text-2xl font-semibold">Top demand skills</h2>
            <div className="mt-4 space-y-3">
              {(data?.insights.topDemandSkills || []).map(([skill, count]) => (
                <div key={skill} className="soft-panel flex items-center justify-between p-4">
                  <span className="font-semibold">{skill}</span>
                  <span className="chip">{count} requests</span>
                </div>
              ))}
            </div>
          </div>
          <div className="panel p-6">
            <h2 className="text-2xl font-semibold">Personal suggestions</h2>
            <p className="mt-3 text-sm leading-7 text-soft">
              Recommended skills: {(data?.userSuggestions.recommendedSkills || []).join(", ")}
            </p>
            <p className="mt-3 text-sm leading-7 text-soft">
              Suggested role mode: {data?.userSuggestions.nextBestRole || "both"}
            </p>
          </div>
        </section>
        <section className="space-y-4">
          {(data?.insights.recentRequests || []).map((request) => (
            <RequestCard key={request._id} request={request} />
          ))}
        </section>
      </div>
    </AppShell>
  );
}
