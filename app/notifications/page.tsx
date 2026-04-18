"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell/AppShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { api } from "@/lib/api";
import { NotificationItem } from "@/lib/types";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    api.getNotifications().then((response) => setNotifications(response.data.notifications));
  }, []);

  return (
    <AppShell>
      <SectionHeading eyebrow="Notifications" title="Keep the momentum moving" body="New helpers, message nudges, and trust score milestones all show up here." />
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification._id} className="panel flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-xl font-semibold">{notification.title}</p>
                {!notification.read ? <span className="chip bg-rose-100 text-rose-700">Unread</span> : null}
              </div>
              <p className="mt-2 text-sm leading-7 text-soft">{notification.body}</p>
            </div>
            {notification.link ? (
              <Link href={notification.link} className="btn-secondary">
                Open
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </AppShell>
  );
}
