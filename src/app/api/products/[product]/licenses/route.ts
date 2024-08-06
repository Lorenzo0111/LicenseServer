import { admin } from "@/lib/backend";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = admin(async (_, { params }) => {
  if (!params?.product || typeof params.product !== "string")
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });

  const licenses = await prisma.license.findMany({
    where: {
      productId: parseInt(params.product) || -1,
    },
  });

  return NextResponse.json(licenses);
});

export const requestSchema = z.object({
  maxIps: z.number().int().positive().max(999),
  expiresAt: z.string().date(),
  userId: z.string().optional(),
});
export const PUT = admin(async (req, { params }) => {
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

  const license = await prisma.license.create({
    data: {
      maxIps: data.data.maxIps,
      expiresAt: new Date(data.data.expiresAt),
      productId: parseInt(params.product),
      userId: data.data.userId,
    },
  });

  return NextResponse.json(license);
});
