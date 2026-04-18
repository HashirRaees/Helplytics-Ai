export type UserRole = "need_help" | "can_help" | "both";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  onboardingCompleted?: boolean;
  profile?: {
    headline?: string;
    bio?: string;
    skills?: string[];
    interests?: string[];
    location?: string;
    availability?: string;
  };
  stats?: {
    requestsCreated?: number;
    requestsHelped?: number;
    trustScore?: number;
  };
  badges?: string[];
};

export type HelpRequest = {
  _id: string;
  title: string;
  description: string;
  category: string;
  urgency: "low" | "medium" | "high";
  status: "open" | "solved";
  tags: string[];
  location: string;
  suggestedSkills: string[];
  aiInsight: string;
  createdAt: string;
  createdBy: {
    _id?: string;
    name: string;
    role: UserRole;
    profile?: {
      location?: string;
      skills?: string[];
    };
  };
  helpers: {
    user: {
      _id: string;
      name: string;
      profile?: {
        location?: string;
        skills?: string[];
      };
      stats?: {
        trustScore?: number;
      };
      badges?: string[];
    };
    note?: string;
    status: string;
  }[];
};

export type DashboardData = {
  stats: {
    requestsCreated: number;
    requestsHelped: number;
    trustScore: number;
    unreadNotifications: number;
  };
  recentRequests: HelpRequest[];
  recentMessages: {
    _id: string;
    request?: { title: string };
    participants: { _id: string; name: string }[];
    lastMessageAt: string;
  }[];
};

export type NotificationItem = {
  _id: string;
  title: string;
  body: string;
  type: string;
  read: boolean;
  link?: string;
  createdAt: string;
};

export type Conversation = {
  _id: string;
  participants: { _id: string; name: string; role?: UserRole }[];
  request?: { title: string; category?: string; urgency?: string };
  messages?: {
    _id: string;
    sender: { _id: string; name: string };
    body: string;
    createdAt: string;
  }[];
  lastMessageAt: string;
};
