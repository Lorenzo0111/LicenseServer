import { License } from "@/components/dashboard/license";
import { prisma } from "@/lib/prisma";
import axios from "axios";
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
          {user.name}{" "}
          {user.admin ? (
            <button
              onClick={() => {
                axios
                  .patch(`/api/users/${user.id}`, {
                    admin: false,
                  })
                  .then(() => {
                    window.location.reload();
                  });
              }}
              className="rounded-xl bg-primary px-2 text-sm"
            >
              ADMIN
            </button>
          ) : (
            <button
              onClick={() => {
                axios
                  .patch(`/api/users/${user.id}`, {
                    admin: true,
                  })
                  .then(() => {
                    window.location.reload();
                  });
              }}
              className="rounded-xl bg-secondary px-2 text-sm"
            >
              USER
            </button>
          )}
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
