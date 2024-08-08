import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/dashboard/sidebar";
import { auth } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";
import { isAdmin } from "@/lib/backend";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "License | Dashboard",
  description: "Manage your licenses",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const admin = await isAdmin(session?.user.id ?? null);

  return (
    <html lang="en">
      <body
        className={cn(
          "flex min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Sidebar session={session} admin={admin} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
