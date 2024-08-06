import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id) || -1,
    },
  });

  return NextResponse.json(product);
};
