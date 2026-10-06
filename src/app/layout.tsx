import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScopePilot AI — Autonomous Product Blueprint & Proposal Agent",
  description: "Autonomous AI-powered Product Strategist & Solution Architect built for G7 UK: Think. Build. Innovate.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className={`${inter.className} min-h-screen bg-zinc-950 text-zinc-100 flex flex-col antialiased selection:bg-indigo-500/30 selection:text-indigo-200`}>
        {children}
      </body>
    </html>
  );
}
