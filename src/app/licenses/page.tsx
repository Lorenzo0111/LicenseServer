import {
  CreateLicense,
  License,
} from "@/components/dashboard/licenses/license";
import { prisma } from "@/lib/prisma";

async function getLicenses() {
  return await prisma.license.findMany({});
}

async function getProducts() {
  return await prisma.product.findMany({});
}

async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
}

export default async function Products() {
  const licenses = await getLicenses();
  const products = await getProducts();
  const users = await getUsers();

  return (
    <main className="w-full p-4">
      <div className="mb-3 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Licenses</h1>
        <CreateLicense products={products} users={users} />
      </div>

      <div className="flex flex-wrap gap-3">
        {licenses.map((license) => (
          <License key={license.key} license={license} />
        ))}
      </div>
    </main>
  );
}
