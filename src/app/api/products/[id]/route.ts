import { admin } from "@/lib/backend";
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

export const DELETE = admin(async (_, { params }) => {
  if (!params?.id || typeof params.id !== "string")
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });

  const product = await prisma.product.delete({
    where: {
      id: parseInt(params.id) || -1,
    },
  });

  return NextResponse.json(product);
});
