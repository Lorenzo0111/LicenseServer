import { Login, Logout } from "@/components/auth";
import { StatChart } from "@/components/dashboard/home/charts";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/backend";

export default async function Home() {
  const session = await auth();

  if (!session?.user)
    return (
      <main className="m-auto">
        <Login />
      </main>
    );

  if (!(await isAdmin(session.user.id)))
    return (
      <main className="m-auto">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold">401</h1>
          <div>
            <h2 className="text-2xl font-bold">Unauthorized!</h2>
            <p>This resource cannot be accessed.</p>
          </div>
        </div>
        <Logout className="mt-3 w-full" />
      </main>
    );

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Welcome back, {session.user.name}</h1>

      <div className="flex flex-wrap gap-3 pt-4">
        <StatChart type="licenses" />
        <StatChart type="users" />
      </div>
    </main>
  );
}
