"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { NotificationItem } from "@/lib/types";
import { Header } from "@/components/layout/Header";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    api.getNotifications()
      .then((response) => setNotifications(response.data.notifications))
      .catch(err => console.error("Failed to fetch notifications", err));
  }, []);

  const getStatusClass = (read: boolean) => {
    return read
      ? "px-5 py-2.5 bg-white text-[13px] font-bold text-[#1c1a17] rounded-full border border-[#1a1f1d]/5 shadow-sm"
      : "px-5 py-2.5 bg-white text-[13px] font-bold text-[#1c1a17] rounded-full border border-[#1a1f1d]/5 shadow-sm";
  };

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
            <div className="eyebrow !text-[#9ccbcb] mb-4 uppercase tracking-widest text-[12px] font-bold">NOTIFICATIONS</div>
            <h1 className="text-4xl md:text-[56px] font-extrabold text-white leading-[1.05] tracking-tighter mb-6 font-display">
              Stay updated on requests, helpers, and trust signals.
            </h1>
            <p className="text-[#a4bcbb] text-[16px] leading-relaxed max-w-2xl font-semibold opacity-90">
              Track new matches, solved items, AI insights, and reputation changes in one place.
            </p>
          </div>
        </div>

        {/* FEED SECTION */}
        <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 md:p-12 border border-[#1a1f1d]/5 shadow-sm">
          <div className="mb-10">
            <div className="eyebrow mb-3 !text-[#0f766e] uppercase tracking-widest text-[12px] font-bold">LIVE UPDATES</div>
            <h2 className="text-[36px] font-extrabold tracking-tight font-display text-[#1c1a17]">Notification feed</h2>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification._id} className="bg-white rounded-[24px] p-8 border border-[#1a1f1d]/5 flex justify-between items-center group hover:shadow-md transition-all">
                <div>
                  <h3 className="text-[17px] font-bold text-[#1c1a17] mb-2">{notification.title}</h3>
                  <p className="text-[14px] text-[#5f685f] font-semibold">
                    {notification.type || 'Activity'} • {notification.createdAt || 'Just now'}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={getStatusClass(notification.read)}>
                    {notification.read ? 'Read' : 'Unread'}
                  </span>
                </div>
              </div>
            ))}

            {notifications.length === 0 && (
              <div className="py-20 text-center bg-[#fdfaf5] rounded-[24px] border border-dashed border-[#1a1f1d]/10">
                <p className="text-[#5f685f] font-semibold">No community signals detected yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-28 border-t flex justify-center border-[#f0eee9] pt-8 pb-4 relative z-10 text-center">
          <p className="text-[12px] text-[#778077] font-semibold">
            Helplytics AI notifications ensure you never miss a chance to help or receive support.
          </p>
        </div>

      </div>
    </div>
  );
}
