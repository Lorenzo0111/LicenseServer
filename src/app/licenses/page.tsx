import { License } from "@/components/dashboard/licenses/license";
import { prisma } from "@/lib/prisma";

async function getLicenses() {
  return await prisma.license.findMany({});
}

export default async function Products() {
  const licenses = await getLicenses();

  return (
    <main className="w-full p-4">
      <div className="mb-3 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Licenses</h1>
      </div>

      <div className="flex flex-wrap gap-3">
        {licenses.map((license) => (
          <License key={license.key} license={license} />
        ))}
      </div>
    </main>
  );
}
