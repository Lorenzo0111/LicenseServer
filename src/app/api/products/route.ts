import { admin } from "@/lib/backend";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = async () => {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
};

const requestSchema = z.object({
  name: z.string(),
});
export const PUT = admin(async (req) => {
  const json = await req.json();
  const data = requestSchema.safeParse(json);

  if (!data.success) {
    return NextResponse.json(
      { error: "Invalid request body", errors: data.error },
      { status: 400 },
    );
  }

  const product = await prisma.product.create({
    data: {
      name: data.data.name,
    },
  });

  return NextResponse.json(product);
});
