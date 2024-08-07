import { admin } from "@/lib/backend";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requestSchema } from "../route";

export const GET = async ({
  params: { product: productId },
}: {
  params: { product: string };
}) => {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productId) || -1,
    },
  });

  return NextResponse.json(product);
};

export const PATCH = admin(async (req, { params }) => {
  if (!params?.product || typeof params.product !== "string")
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });

  const json = await req.json();
  const data = requestSchema.safeParse(json);

  if (!data.success) {
    return NextResponse.json(
      { error: "Invalid request body", errors: data.error },
      { status: 400 },
    );
  }

  const product = await prisma.product.update({
    where: {
      id: parseInt(params.product) || -1,
    },
    data: {
      name: data.data.name,
    },
  });

  return NextResponse.json(product);
});

export const DELETE = admin(async (_, { params }) => {
  if (!params?.product || typeof params.product !== "string")
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });

  const product = await prisma.product.delete({
    where: {
      id: parseInt(params.product) || -1,
    },
  });

  return NextResponse.json(product);
});
