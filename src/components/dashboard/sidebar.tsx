"use client";

import { Code, Home, Package, User, UserCircle, Users } from "lucide-react";
import { ButtonLink } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { ThemeSwitch } from "./theme-switch";

export function SidebarLink({
  href,
  icon,
  className,
}: {
  href: string;
  icon: React.ReactNode;
  className?: string;
}) {
  const path = usePathname();

  return (
    <ButtonLink
      variant={
        (href === "/" ? path === "/" : path.startsWith(href))
          ? "secondary"
          : "outline"
      }
      className={cn("p-2", className)}
      href={href}
    >
      {icon}
    </ButtonLink>
  );
}

export function Sidebar({
  session,
  admin,
}: {
  session: Session | null;
  admin: boolean;
}) {
  if (!session?.user) return null;

  return (
    <nav className="flex h-screen w-20 flex-col items-center gap-3 border-r py-4">
      {admin && <SidebarLink href="/" icon={<Home size={24} />} />}
      {admin && <SidebarLink href="/products" icon={<Package size={24} />} />}
      {admin && <SidebarLink href="/licenses" icon={<Code size={24} />} />}
      {admin && <SidebarLink href="/users" icon={<Users size={24} />} />}

      <ThemeSwitch className="mt-auto" />
      <SidebarLink href="/account" icon={<UserCircle size={24} />} />
    </nav>
  );
}
