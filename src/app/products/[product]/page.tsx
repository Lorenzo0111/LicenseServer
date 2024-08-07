import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
  return await prisma.product.findUnique({
    where: { id: parseInt(id) || -1 },
  });
}

export default async function Product({
  params,
}: {
  params: { product: string };
}) {
  const product = await getProduct(params.product);
  if (!product) return notFound();

  return (
    <main className="w-full p-4">
      <div className="mb-3 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Products » {product.name}</h1>
      </div>
    </main>
  );
}
