import {
  License,
  UpdateLicense,
} from "@/components/dashboard/licenses/license";
import { UpdateProduct } from "@/components/dashboard/products/product";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

async function getLicense(id: string) {
  return await prisma.license.findUnique({
    where: { key: id },
  });
}

export default async function Product({
  params,
}: {
  params: { license: string };
}) {
  const license = await getLicense(params.license);
  if (!license) return notFound();

  return (
    <main className="w-full p-4">
      <div className="mb-3 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">{license.key}</h1>
      </div>

      <UpdateLicense license={license} />
    </main>
  );
}
