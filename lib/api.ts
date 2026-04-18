"use client";

import { mockAiCenter, mockConversations, mockDashboard, mockLeaders, mockNotifications, mockRequests, mockUser } from "./mock-data";
import { sessionStore } from "./storage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type ApiOptions = RequestInit & {
  withAuth?: boolean;
};

async function request<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { withAuth = false, headers, ...rest } = options;
  const token = sessionStore.getToken();

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(withAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    cache: "no-store",
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Something went wrong");
  }

  return json as T;
}

export const api = {
  // --- AUTH ---
  async login(payload: { email: string; password: string }) {
    return request<{ data: { token: string; user: typeof mockUser } }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  async signup(payload: { name: string; email: string; password: string; role: string }) {
    return request<{ data: { token: string; user: typeof mockUser } }>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  async updateOnboarding(payload: Record<string, unknown>) {
    return request<{ data: { user: typeof mockUser } }>("/users/onboarding", {
      method: "PATCH",
      body: JSON.stringify(payload),
      withAuth: true,
    });
  },

  // --- DASHBOARD ---
  async getDashboard() {
    // If guest, show mock data
    if (!sessionStore.getToken()) {
      return { data: mockDashboard };
    }
    // If logged in, strictly use backend
    return await request<{ data: typeof mockDashboard }>("/dashboard", { withAuth: true });
  },

  // --- REQUESTS ---
  async getRequests(search = "") {
    if (!sessionStore.getToken()) {
      return { data: { requests: mockRequests } };
    }
    return await request<{ data: { requests: typeof mockRequests } }>(`/requests${search}`);
  },
  async getRequest(id: string) {
    if (!sessionStore.getToken()) {
      return {
        data: {
          request: mockRequests.find((item) => item._id === id) || mockRequests[0],
        },
      };
    }
    return await request<{ data: { request: (typeof mockRequests)[number] } }>(`/requests/${id}`);
  },
  async createRequest(payload: Record<string, unknown>) {
    return request<{ data: { request: (typeof mockRequests)[number] } }>("/requests", {
      method: "POST",
      body: JSON.stringify(payload),
      withAuth: true,
    });
  },
  async offerHelp(id: string, note: string) {
    return request(`/requests/${id}/help`, {
      method: "POST",
      body: JSON.stringify({ note }),
      withAuth: true,
    });
  },
  async markSolved(id: string, helperId?: string) {
    return request(`/requests/${id}/solve`, {
      method: "PATCH",
      body: JSON.stringify({ helperId }),
      withAuth: true,
    });
  },

  // --- MESSAGES ---
  async getMessages() {
    if (!sessionStore.getToken()) {
      return { data: { conversations: mockConversations } };
    }
    return await request<{ data: { conversations: typeof mockConversations } }>("/messages", {
      withAuth: true,
    });
  },
  async getConversation(id: string) {
    if (!sessionStore.getToken()) {
      return { data: { conversation: mockConversations[0] } };
    }
    return await request<{ data: { conversation: (typeof mockConversations)[number] } }>(`/messages/${id}`, {
      withAuth: true,
    });
  },
  async sendMessage(id: string, body: string) {
    return request(`/messages/${id}/messages`, {
      method: "POST",
      body: JSON.stringify({ body }),
      withAuth: true,
    });
  },

  // --- LEADERBOARD & AI ---
  async getLeaderboard() {
    // Leaderboard can be public, but we still apply the mock-for-guests rule
    if (!sessionStore.getToken()) {
      return { data: { leaders: mockLeaders } };
    }
    return await request<{ data: { leaders: typeof mockLeaders } }>("/users/leaderboard");
  },
  async getAiCenter() {
    if (!sessionStore.getToken()) {
      return { data: mockAiCenter };
    }
    return await request<{ data: typeof mockAiCenter }>("/ai/center", { withAuth: true });
  },
  async previewAi(payload: { title: string; description: string }) {
    return request<{ data: { preview: { category: string; urgency: string; tags: string[]; suggestedSkills: string[] } } }>(
      "/ai/preview",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  },

  // --- NOTIFICATIONS & PROFILE ---
  async getNotifications() {
    if (!sessionStore.getToken()) {
      return { data: { notifications: mockNotifications } };
    }
    return await request<{ data: { notifications: typeof mockNotifications } }>("/notifications", {
      withAuth: true,
    });
  },
  async getProfile() {
    if (!sessionStore.getToken()) {
      return { data: { user: mockUser } };
    }
    return await request<{ data: { user: typeof mockUser } }>("/users/me", { withAuth: true });
  },
  async updateProfile(payload: Record<string, unknown>) {
    return request<{ data: { user: typeof mockUser } }>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(payload),
      withAuth: true,
    });
  },
};
