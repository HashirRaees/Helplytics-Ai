import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Helplytics AI",
  description: "Community support platform for people who need help and people who can help.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[var(--bg)] text-[var(--text)] antialiased">
        {children}
      </body>
    </html>
  );
}
