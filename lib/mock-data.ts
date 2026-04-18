import { Conversation, DashboardData, HelpRequest, NotificationItem, SessionUser } from "./types";

export const mockUser: SessionUser = {
  id: "demo-user",
  name: "Amina Tariq",
  email: "amina@helplytics.dev",
  role: "both",
  onboardingCompleted: true,
  profile: {
    headline: "Community builder and startup operator",
    bio: "Helping people navigate product, frontend, and career roadblocks.",
    skills: ["react", "product strategy", "mentoring"],
    interests: ["community", "career growth", "civic tech"],
    location: "Karachi",
    availability: "Evenings"
  },
  stats: {
    requestsCreated: 5,
    requestsHelped: 12,
    trustScore: 84
  },
  badges: ["Trusted helper", "Rapid responder"]
};

export const mockRequests: HelpRequest[] = [
  {
    _id: "req-1",
    title: "Need help refining my MERN portfolio before interviews",
    description:
      "I have two interviews this week and need feedback on the structure, case studies, and visual polish of my portfolio.",
    category: "Career support",
    urgency: "high",
    status: "open",
    tags: ["portfolio", "mern", "interview", "feedback"],
    location: "Karachi",
    suggestedSkills: ["react", "design", "mentoring"],
    aiInsight:
      "Helplytics suggests Career support with high urgency. Best matched skills: react, design, mentoring.",
    createdAt: new Date().toISOString(),
    createdBy: {
      _id: "user-1",
      name: "Hassan Malik",
      role: "need_help",
      profile: { location: "Karachi", skills: ["javascript"] }
    },
    helpers: [
      {
        user: {
          _id: "helper-1",
          name: "Noor Fatima",
          profile: { location: "Lahore", skills: ["react", "ui"] },
          stats: { trustScore: 91 },
          badges: ["Community pillar"]
        },
        note: "I can review both UX and code samples tonight.",
        status: "active"
      }
    ]
  },
  {
    _id: "req-2",
    title: "Looking for someone to explain Express auth middleware",
    description:
      "I understand JWT basics but I am stuck on protect and authorize middleware flow in a Node and Express backend.",
    category: "Tech help",
    urgency: "medium",
    status: "open",
    tags: ["node", "express", "jwt", "backend"],
    location: "Remote",
    suggestedSkills: ["node", "mentoring"],
    aiInsight: "Helplytics suggests Tech help with medium urgency. Best matched skills: node, mentoring.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    createdBy: {
      _id: "user-2",
      name: "Sara Khan",
      role: "need_help",
      profile: { location: "Remote", skills: ["javascript"] }
    },
    helpers: []
  }
];

export const mockDashboard: DashboardData = {
  stats: {
    requestsCreated: 5,
    requestsHelped: 12,
    trustScore: 84,
    unreadNotifications: 4
  },
  recentRequests: mockRequests,
  recentMessages: [
    {
      _id: "conv-1",
      request: { title: "Need help refining my MERN portfolio before interviews" },
      participants: [
        { _id: "demo-user", name: "Amina Tariq" },
        { _id: "user-1", name: "Hassan Malik" }
      ],
      lastMessageAt: new Date().toISOString()
    }
  ]
};

export const mockNotifications: NotificationItem[] = [
  {
    _id: "notif-1",
    title: "New helper matched",
    body: "Noor Fatima offered to help on your portfolio request.",
    type: "match",
    read: false,
    link: "/requests/req-1",
    createdAt: new Date().toISOString()
  },
  {
    _id: "notif-2",
    title: "Trust score increased",
    body: "You earned 12 trust points after resolving a community request.",
    type: "achievement",
    read: false,
    link: "/leaderboard",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  }
];

export const mockConversations: Conversation[] = [
  {
    _id: "conv-1",
    participants: [
      { _id: "demo-user", name: "Amina Tariq", role: "both" },
      { _id: "user-1", name: "Hassan Malik", role: "need_help" }
    ],
    request: {
      title: "Need help refining my MERN portfolio before interviews",
      category: "Career support",
      urgency: "high"
    },
    lastMessageAt: new Date().toISOString(),
    messages: [
      {
        _id: "msg-1",
        sender: { _id: "user-1", name: "Hassan Malik" },
        body: "Could you review my hero section and case study storytelling?",
        createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString()
      },
      {
        _id: "msg-2",
        sender: { _id: "demo-user", name: "Amina Tariq" },
        body: "Absolutely. I would tighten the first screen and lead with outcomes before tools.",
        createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
      }
    ]
  }
];

export const mockLeaders = [
  {
    _id: "leader-1",
    name: "Noor Fatima",
    role: "can_help",
    profile: { location: "Lahore", skills: ["react", "ui", "mentoring"] },
    stats: { trustScore: 91, requestsHelped: 28 },
    badges: ["Community pillar"]
  },
  {
    _id: "leader-2",
    name: "Amina Tariq",
    role: "both",
    profile: { location: "Karachi", skills: ["product strategy", "react", "writing"] },
    stats: { trustScore: 84, requestsHelped: 12 },
    badges: ["Trusted helper", "Rapid responder"]
  }
];

export const mockAiCenter: {
  insights: {
    topDemandSkills: [string, number][];
    recentRequests: HelpRequest[];
  };
  userSuggestions: {
    recommendedSkills: string[];
    nextBestRole: string;
  };
} = {
  insights: {
    topDemandSkills: [
      ["react", 6],
      ["mentoring", 5],
      ["node", 4]
    ],
    recentRequests: mockRequests
  },
  userSuggestions: {
    recommendedSkills: ["react", "product strategy", "mentoring"],
    nextBestRole: "both"
  }
};
