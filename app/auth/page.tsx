import { AuthForm } from "@/components/forms/AuthForm";

export default function AuthPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center gap-8 px-4 py-10 md:px-8">
      <div className="hidden flex-1 lg:block">
        <div className="panel space-y-6 p-9">
          <p className="chip">Product-grade community support</p>
          <h1 className="text-5xl font-semibold tracking-tight">
            Login and signup already exist. Now they drive the full Helplytics experience.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-soft">
            The original auth base has been extended into onboarding, request workflows, messaging, leaderboard,
            notifications, and AI-powered helper suggestions.
          </p>
        </div>
      </div>
      <div className="flex flex-1 justify-center">
        <AuthForm />
      </div>
    </main>
  );
}
