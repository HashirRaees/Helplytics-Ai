import Link from "next/link";

const pillars = [
  {
    title: "Post help requests fast",
    body: "People can ask for career, community, learning, or technical support in minutes."
  },
  {
    title: "Match the right helpers",
    body: "Skill tags, urgency detection, and trust scores keep the feed useful and actionable."
  },
  {
    title: "Run a smooth demo",
    body: "Dashboard stats, messaging, leaderboard, AI center, and notifications make it feel product-ready."
  },
];

export default function Home() {
  return (
    <main className="grid-bg relative overflow-hidden px-6 py-6 md:px-10">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10">
        <header className="flex items-center justify-between rounded-[28px] border border-[var(--line)] bg-white/75 px-5 py-4 backdrop-blur md:px-7">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
              Helplytics AI
            </p>
            <p className="text-sm text-soft">Community support with startup-grade polish</p>
          </div>
          <div className="flex gap-3">
            <Link href="/explore" className="btn-secondary">
              Explore
            </Link>
            <Link href="/auth" className="btn-primary">
              Launch App
            </Link>
          </div>
        </header>

        <section className="panel relative overflow-hidden px-6 py-10 md:px-10 md:py-14">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[rgba(245,158,11,0.17)] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-[rgba(15,118,110,0.13)] blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <span className="chip">AI categorization + trust-driven matching</span>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                Build a support network that feels less like a forum and more like a real product.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-soft">
                Helplytics AI helps communities turn requests into outcomes with onboarding, filtered help feeds,
                helper workflows, messaging, notifications, and lightweight AI suggestions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/auth" className="btn-primary">
                  Create account
                </Link>
                <Link href="/dashboard" className="btn-secondary">
                  Preview dashboard
                </Link>
              </div>
              <div className="grid gap-4 pt-4 md:grid-cols-3">
                {["Need help", "Can help", "Both roles"].map((item) => (
                  <div key={item} className="soft-panel px-4 py-4 text-sm font-medium">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-panel space-y-5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">
                    Live snapshot
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">What the demo highlights</h2>
                </div>
                <span className="chip bg-[rgba(245,158,11,0.12)] text-amber-700">Hackathon-ready</span>
              </div>
              {pillars.map((pillar) => (
                <div key={pillar.title} className="rounded-[20px] border border-[var(--line)] bg-white/85 p-5">
                  <h3 className="text-lg font-semibold">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-soft">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["Requests", "Auto-tagged, categorized, urgency-aware help requests"],
            ["Messaging", "Simple conversation flow between requester and helper"],
            ["Leaderboard", "Trust score and contribution rankings for top helpers"],
          ].map(([title, body]) => (
            <div key={title} className="panel p-6">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-soft">{body}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
