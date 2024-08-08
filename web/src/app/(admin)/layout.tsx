import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/backend";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) return redirect("/");
  if (!(await isAdmin(session.user.id))) return redirect("/");

  return children;
}
