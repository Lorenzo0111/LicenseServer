import { CreateLicense, License } from "@/components/dashboard/license";
import { UpdateProduct } from "@/components/dashboard/product";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
  return await prisma.product.findUnique({
    where: { id: parseInt(id) || -1 },
  });
}

async function getLicenses(id: string) {
  return await prisma.license.findMany({
    where: { productId: parseInt(id) || -1 },
  });
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

export default async function Product({
  params,
}: {
  params: { product: string };
}) {
  const product = await getProduct(params.product);
  if (!product) return notFound();

  const licenses = await getLicenses(params.product);
  const users = await getUsers();

  return (
    <main className="w-full p-4">
      <div className="mb-3 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Products » {product.name}</h1>
      </div>

      <UpdateProduct product={product} />

      <div className="mb-3 mt-10 flex w-full items-center justify-between">
        <h2 className="text-2xl font-bold">Licenses ({licenses.length})</h2>
        <CreateLicense product={product.id} products={[]} users={users} />
      </div>

      <div className="flex flex-wrap gap-3">
        {licenses.map((license) => (
          <License key={license.key} license={license} />
        ))}
      </div>
    </main>
  );
}
