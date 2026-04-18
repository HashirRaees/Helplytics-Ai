"use client";

import { FormEvent, useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell/AppShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { api } from "@/lib/api";
import { Conversation } from "@/lib/types";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [draft, setDraft] = useState("");

  useEffect(() => {
    api.getMessages().then((response) => {
      setConversations(response.data.conversations);
      setSelectedId(response.data.conversations[0]?._id || "");
    });
  }, []);

  const selectedConversation = conversations.find((conversation) => conversation._id === selectedId);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedId || !draft.trim()) return;

    await api.sendMessage(selectedId, draft);
    setDraft("");
  }

  return (
    <AppShell>
      <SectionHeading eyebrow="Messaging" title="Support conversations" body="Simple non-realtime chat between the requester and the helper." />
      <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
        <aside className="panel space-y-3 p-4">
          {conversations.map((conversation) => (
            <button
              key={conversation._id}
              onClick={() => setSelectedId(conversation._id)}
              className={`w-full rounded-[18px] p-4 text-left ${selectedId === conversation._id ? "bg-[var(--primary)] text-white" : "bg-[var(--surface-muted)]"}`}
            >
              <p className="font-semibold">{conversation.request?.title}</p>
              <p className={`mt-1 text-sm ${selectedId === conversation._id ? "text-white/80" : "text-soft"}`}>
                {conversation.participants.map((participant) => participant.name).join(" • ")}
              </p>
            </button>
          ))}
        </aside>

        <section className="panel flex min-h-[540px] flex-col p-6">
          <div className="border-b border-[var(--line)] pb-4">
            <h2 className="text-2xl font-semibold">{selectedConversation?.request?.title || "Select a conversation"}</h2>
          </div>
          <div className="flex-1 space-y-4 overflow-auto py-6">
            {(selectedConversation?.messages || []).map((message) => (
              <div key={message._id} className="soft-panel p-4">
                <p className="text-sm font-semibold">{message.sender.name}</p>
                <p className="mt-2 text-sm leading-7 text-soft">{message.body}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-3 border-t border-[var(--line)] pt-4">
            <input className="input" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write a reply" />
            <button className="btn-primary">Send</button>
          </form>
        </section>
      </div>
    </AppShell>
  );
}
