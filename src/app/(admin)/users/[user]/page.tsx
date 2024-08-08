import { License } from "@/components/dashboard/license";
import { UpdateUserRole } from "@/components/dashboard/user";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      licenses: true,
      admin: true,
    },
  });
}

export default async function UserPage({
  params,
}: {
  params: {
    user: string;
  };
}) {
  const user = await getUser(params.user);
  if (!user) return notFound();

  return (
    <main className="w-full p-4">
      <div className="mb-3 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">
          {user.name} <UpdateUserRole user={user} />
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {user.licenses.map((license) => (
          <License key={license.key} license={license} />
        ))}
      </div>
    </main>
  );
}
