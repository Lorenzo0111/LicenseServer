import Login from "@/components/auth/login";
import { LicensesChart, StatChart } from "@/components/dashboard/home/charts";
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

      <div className="flex flex-wrap gap-3 pt-4">
        <StatChart type="licenses" />
        <StatChart type="users" />
      </div>
    </main>
  );
}
