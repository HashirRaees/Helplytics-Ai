"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { api } from "@/lib/api";
import { Header } from "@/components/layout/Header";

export default function CreateRequestPage() {
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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await api.createRequest({
        title,
        description,
        tags: splitTags(tags),
        category: category || undefined,
        urgency: urgency || undefined,
        location: location || "Remote",
      });

      router.push(`/requests/${response.data.request._id}`);
    } catch (err) {
      console.error("Failed to create request", err);
    } finally {
      setSubmitting(false);
    }
  }

  const applySuggestions = () => {
    if (preview.category) setCategory(preview.category.toLowerCase().split(' ').join('-'));
    if (preview.urgency) setUrgency(preview.urgency.toLowerCase());
    if (preview.tags) setTags(preview.tags.join(', '));
  };

  const splitTags = (value: string) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

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
            <div className="eyebrow !text-[#9ccbcb] mb-4">CREATE REQUEST</div>
            <h1 className="text-4xl md:text-[52px] font-extrabold text-white leading-[1.05] tracking-tighter mb-4 font-display">
              Turn a rough problem into a clear help request.
            </h1>
            <p className="text-[#a4bcbb] text-[16px] leading-relaxed max-w-2xl font-semibold opacity-90">
              Use built-in AI suggestions for category, urgency, tags, and a stronger description rewrite.
            </p>
          </div>
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-x-12 items-start">

          {/* Main Form */}
          <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 md:p-10 border border-[#1a1f1d]/5 shadow-sm space-y-8">
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-[13px] text-[#5f685f] font-bold">Title</label>
                <input
                  type="text"
                  placeholder="Need review on my JavaScript quiz app before submission"
                  className="w-full h-14 px-4 bg-white border border-[#1a1f1d]/10 rounded-2xl text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all placeholder:text-[#939088]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[13px] text-[#5f685f] font-bold">Description</label>
                <textarea
                  placeholder="Explain the challenge, your current progress, deadline, and what kind of help would be useful."
                  className="w-full h-40 p-4 bg-white border border-[#1a1f1d]/10 rounded-2xl text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all placeholder:text-[#939088] resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tags */}
                <div className="space-y-2">
                  <label className="text-[13px] text-[#5f685f] font-bold">Tags</label>
                  <input
                    type="text"
                    placeholder="JavaScript, Debugging, Review"
                    className="w-full h-14 px-4 bg-white border border-[#1a1f1d]/10 rounded-2xl text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all placeholder:text-[#939088]"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-[13px] text-[#5f685f] font-bold">Category</label>
                  <select
                    className="w-full h-14 px-4 bg-white border border-[#1a1f1d]/10 rounded-2xl text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all appearance-none cursor-pointer"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    <option value="web-development">Web Development</option>
                    <option value="design">Design</option>
                    <option value="career">Career</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Urgency */}
              <div className="space-y-2">
                <label className="text-[13px] text-[#5f685f] font-bold">Urgency</label>
                <select
                  className="w-full h-14 px-4 bg-white border border-[#1a1f1d]/10 rounded-2xl text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 transition-all appearance-none cursor-pointer"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                >
                  <option value="">Let AI detect urgency</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={applySuggestions}
                disabled={!preview.category}
                className="flex-1 h-14 bg-white text-[#1c1a17] font-bold rounded-full shadow-sm border border-[#1a1f1d]/10 hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Apply AI suggestions
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || !title || !description}
                className="flex-[1.2] h-14 bg-brand-gradient text-white font-bold rounded-full shadow-lg hover:opacity-90 transition-all"
              >
                {submitting ? "Publishing..." : "Publish request"}
              </button>
            </div>
          </div>

          {/* AI Sidebar */}
          <div className="space-y-8 mt-12 lg:mt-0">
            <div className="bg-[#fffcf7] rounded-[32px] p-8 border border-[#1a1f1d]/5 shadow-sm">
              <div className="eyebrow mb-3 !text-[#0f766e]">AI ASSISTANT</div>
              <h2 className="text-[24px] font-extrabold tracking-tight font-display mb-8">Smart request guidance</h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-[#1a1f1d]/5">
                  <span className="text-[14px] text-[#5f685f] font-semibold">Suggested category</span>
                  <span className="text-[14px] font-bold">{preview.category || "Community"}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-[#1a1f1d]/5">
                  <span className="text-[14px] text-[#5f685f] font-semibold">Detected urgency</span>
                  <span className="text-[14px] font-bold">{preview.urgency || "Low"}</span>
                </div>
                <div className="py-4 border-b border-[#1a1f1d]/5">
                  <span className="text-[14px] text-[#5f685f] font-semibold block mb-3">Suggested tags</span>
                  <div className="flex flex-wrap gap-2">
                    {preview.tags?.length ? preview.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-[#f0f6f5] text-[10.5px] font-bold text-[#0f766e] rounded-full">{tag}</span>
                    )) : (
                      <span className="text-[13px] font-bold text-[#939088]">Add more detail for smarter tags</span>
                    )}
                  </div>
                </div>
                <div className="py-4">
                  <span className="text-[14px] text-[#5f685f] font-semibold block mb-3">Rewrite suggestion</span>
                  <p className="text-[13.5px] font-bold leading-relaxed text-[#1c1a17]">
                    {description.length > 30 ? "Click 'Apply' to use a more structured and punchy version of your description." : "Start describing the challenge to generate a stronger version."}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-28 border-t flex justify-center border-[#f0eee9] pt-8 pb-4 relative z-10 text-center">
          <p className="text-[12px] text-[#778077] font-semibold">
            Helplytics AI request refinement saves time for helpers and gets you solutions faster.
          </p>
        </div>

      </div>
    </div>
  );
}
