import Login from "@/components/auth/login";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  if (!session?.user)
    return (
      <main className="m-auto">
        <Login />
      </main>
    );

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Welcome back, {session.user.name}</h1>

      <div className="flex flex-wrap gap-3 pt-4"></div>
    </main>
  );
}
