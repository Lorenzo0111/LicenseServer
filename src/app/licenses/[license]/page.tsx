import { LicenseIp, UpdateLicense } from "@/components/dashboard/license";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/backend";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

async function getLicense(id: string) {
  return await prisma.license.findUnique({
    where: { key: id },
  });
}

async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

export default async function Product({
  params,
}: {
  params: { license: string };
}) {
  const session = await auth();
  if (!session?.user) return notFound();

  const admin = await isAdmin(session.user.id);

  const license = await getLicense(params.license);
  if (!license || (license.userId !== session.user.id && !admin))
    return notFound();

  const users = admin ? await getUsers() : [session.user];

  return (
    <main className="w-full p-4">
      <div className="mb-3 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">{license.key}</h1>
      </div>

      <UpdateLicense license={license} users={users} disabled={!admin} />

      <div className="mb-3 mt-10">
        <h2 className="text-2xl font-bold">
          IPs ({license.ips.length}/{license.maxIps})
        </h2>
        <p className="italic">Click on an ip to delete it</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {license.ips.map((ip) => (
          <LicenseIp license={license} ip={ip} key={ip} />
        ))}
      </div>
    </main>
  );
}
