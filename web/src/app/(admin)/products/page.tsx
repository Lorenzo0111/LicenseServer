import { CreateProduct, Product } from "@/components/dashboard/product";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getProducts() {
  return await prisma.product.findMany({
    include: {
      licenses: {
        where: {
          OR: [{ expiresAt: { gt: new Date() } }, { expiresAt: null }],
        },
        select: { key: true },
      },
    },
  });
}

export default async function Products() {
  const products = await getProducts();

  return (
    <main className="w-full p-4">
      <div className="mb-3 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <CreateProduct />
      </div>

      <div className="flex flex-wrap gap-3">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            licenses={product.licenses.length}
          />
        ))}
      </div>
    </main>
  );
}
