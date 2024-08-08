import { License } from "@/components/dashboard/license";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

async function getMe() {
  const session = await auth();
  if (!session?.user) return null;

  return await prisma.user.findUnique({
    where: {
      id: session.user.id,
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

export default async function AccountPage() {
  const user = await getMe();
  if (!user) return notFound();

  return (
    <main className="w-full p-4">
      <div className="mb-3 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">{user.name}</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {user.licenses.map((license) => (
          <License key={license.key} license={license} />
        ))}
      </div>
    </main>
  );
}
