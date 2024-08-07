import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/dashboard/sidebar";
import { auth } from "@/lib/auth";

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

  return (
    <html lang="en">
      <body
        className={cn(
          "flex min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Sidebar session={session} />
        {children}
      </body>
    </html>
  );
}
