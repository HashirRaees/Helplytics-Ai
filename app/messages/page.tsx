"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from 'next/link';
import { api } from "@/lib/api";
import { Conversation, SessionUser } from "@/lib/types";
import { sessionStore } from "@/lib/storage";
import { Header } from "@/components/layout/Header";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [recipient, setRecipient] = useState("");
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setUser(sessionStore.getUser());
    api.getMessages()
      .then((response) => {
        setConversations(response.data.conversations);
        if (response.data.conversations.length > 0) {
          setRecipient(response.data.conversations[0].participants.find(p => p._id !== user?.id)?._id || "");
        }
      })
      .catch(err => console.error("Failed to fetch messages", err));
  }, [user?.id]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!recipient || !draft.trim()) return;

    setSubmitting(true);
    try {
      // Logic for finding or starting a conversation would go here
      // For now, we use the first available conversation ID for the demo
      const conversationId = conversations.find(c =>
        c.participants.some(p => p._id === recipient)
      )?._id || conversations[0]?._id;

      if (conversationId) {
        await api.sendMessage(conversationId, draft);
        setDraft("");
        // Refresh messages
        const response = await api.getMessages();
        setConversations(response.data.conversations);
      }
    } catch (err) {
      console.error("Failed to send message", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen text-[#1c1a17] bg-[#fdfaf5] font-sans selection:bg-[#0f766e]/20 relative overflow-hidden pb-20">

      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#dceddb] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#faebd6] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />

      <div className="relative z-10 mx-auto max-w-[1180px] pt-8 px-4 md:px-8">

        <Header />

        {/* HERO CARD */}
        <div className="bg-[#1d2d2a] text-[#e8f1f0] rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#0f766e]/20 to-transparent rounded-full blur-3xl opacity-50"></div>
          <div className="relative z-10">
            <div className="eyebrow !text-[#9ccbcb] mb-4">INTERACTION / MESSAGING</div>
            <h1 className="text-4xl md:text-[52px] font-extrabold text-white leading-[1.05] tracking-tighter mb-4 font-display">
              Keep support moving through direct communication.
            </h1>
            <p className="text-[#a4bcbb] text-[16px] leading-relaxed max-w-2xl font-semibold opacity-90">
              Basic messaging gives helpers and requesters a clear follow-up path once a match happens.
            </p>
          </div>
        </div>

        {/* MESSAGING GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-x-12 items-start">

          {/* Conversation Stream */}
          <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 md:p-10 border border-[#1a1f1d]/5 shadow-sm space-y-8">
            <div>
              <div className="eyebrow mb-3">CONVERSATION STREAM</div>
              <h2 className="text-[32px] font-extrabold tracking-tight font-display text-[#1c1a17]">Recent messages</h2>
            </div>

            <div className="space-y-4">
              {conversations.length > 0 ? conversations.map((conv) => {
                const partner = conv.participants.find(p => p._id !== user?.id);
                const lastMsg = conv.messages?.[conv.messages.length - 1];

                return (
                  <div key={conv._id} className="bg-white rounded-[24px] p-6 border border-[#1a1f1d]/5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:shadow-md transition-all cursor-pointer">
                    <div className="flex-1">
                      <div className="text-[14px] font-bold text-[#1c1a17] mb-1.5 flex items-center">
                        {user?.name || 'Ayesha Khan'} <span className="mx-2 text-[#939088] font-normal">→</span> {partner?.name || 'Sara Noor'}
                      </div>
                      <p className="text-[14px] text-[#5f685f] font-semibold line-clamp-2 max-w-full">
                        {lastMsg?.body || "I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes."}
                      </p>
                    </div>
                    <div className="bg-[#f0f6f5] text-[#0f766e] px-4 py-2 rounded-full text-[11px] font-bold text-center leading-[1.1] w-fit">
                      {lastMsg ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "09:45 AM"}
                    </div>
                  </div>
                );
              }) : (
                <>
                  {/* Mock for Empty State appearance if no real data */}
                  <div className="bg-white rounded-[24px] p-6 border border-[#1a1f1d]/5 shadow-sm flex justify-between items-center group opacity-80">
                    <div className="flex-1">
                      <div className="text-[14px] font-bold text-[#1c1a17] mb-1.5 flex items-center">
                        Ayesha Khan <span className="mx-2 text-[#939088] font-normal">→</span> Sara Noor
                      </div>
                      <p className="text-[14px] text-[#5f685f] font-semibold line-clamp-2 max-w-[90%]">
                        I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.
                      </p>
                    </div>
                    <div className="bg-[#f0f6f5] text-[#0f766e] px-4 py-3 rounded-full text-[11px] font-bold text-center leading-[1.1]">
                      09:45<br />AM
                    </div>
                  </div>
                  <div className="bg-white rounded-[24px] p-6 border border-[#1a1f1d]/5 shadow-sm flex justify-between items-center group opacity-80">
                    <div className="flex-1">
                      <div className="text-[14px] font-bold text-[#1c1a17] mb-1.5 flex items-center">
                        Hassan Ali <span className="mx-2 text-[#939088] font-normal">→</span> Ayesha Khan
                      </div>
                      <p className="text-[14px] text-[#5f685f] font-semibold line-clamp-2 max-w-[90%]">
                        Your event poster concept is solid. I would tighten the CTA and reduce the background texture.
                      </p>
                    </div>
                    <div className="bg-[#f0f6f5] text-[#0f766e] px-4 py-3 rounded-full text-[11px] font-bold text-center leading-[1.1]">
                      11:10<br />AM
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Send Message Panel */}
          <div className="space-y-8 mt-12 lg:mt-0">
            <div className="bg-[#fffcf7] rounded-[32px] p-8 border border-[#1a1f1d]/5 shadow-sm">
              <div className="eyebrow mb-3 !text-[#0f766e]">SEND MESSAGE</div>
              <h2 className="text-[28px] font-extrabold tracking-tight font-display mb-8 text-[#1c1a17]">Start a conversation</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Recipient */}
                <div className="space-y-2">
                  <label className="text-[13px] text-[#5f685f] font-extrabold">To</label>
                  <select
                    className="w-full h-14 px-4 bg-white border border-[#1a1f1d]/10 rounded-2xl text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all appearance-none cursor-pointer"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  >
                    <option value="">Select recipient</option>
                    {conversations.map(conv => {
                      const partner = conv.participants.find(p => p._id !== user?.id);
                      return <option key={partner?._id} value={partner?._id}>{partner?.name || 'Ayesha Khan'}</option>
                    })}
                    {!conversations.length && <option value="ayesha">Ayesha Khan</option>}
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[13px] text-[#5f685f] font-extrabold">Message</label>
                  <textarea
                    placeholder="Share support details, ask for files, or suggest next steps."
                    className="w-full h-40 p-4 bg-white border border-[#1a1f1d]/10 rounded-2xl text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all placeholder:text-[#939088] resize-none"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting || !recipient || !draft.trim()}
                  className="w-full h-14 bg-brand-gradient text-white font-bold rounded-full shadow-lg hover:opacity-90 transition-all"
                >
                  {submitting ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-28 border-t flex justify-center border-[#f0eee9] pt-8 pb-4 relative z-10 text-center">
          <p className="text-[12px] text-[#778077] font-semibold">
            Helplytics AI messaging ensures clear communication between requesters and high-trust community helpers.
          </p>
        </div>

      </div>
    </div>
  );
}
