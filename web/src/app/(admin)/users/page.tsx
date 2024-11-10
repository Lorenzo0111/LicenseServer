import { User } from "@/components/dashboard/user";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
}

export default async function Users() {
  const users = await getUsers();

  return (
    <main className="w-full p-4">
      <div className="mb-3 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      <div className="flex flex-wrap gap-3">
        {users.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </div>
    </main>
  );
}
