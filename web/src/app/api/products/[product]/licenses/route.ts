import { admin, licenseSchema } from "@/lib/backend";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = admin(async (_, { params }) => {
  if (!params?.product || typeof params.product !== "string")
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });

  const licenses = await prisma.license.findMany({
    where: {
      productId: parseInt(params.product) || -1,
    },
    include: {
      product: {
        select: { name: true },
      },
    },
  });

  return NextResponse.json(licenses);
});

export const PUT = admin(async (req, { params }) => {
  if (!params?.product || typeof params.product !== "string")
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });

  const json = await req.json();
  const data = licenseSchema.safeParse(json);

  if (!data.success) {
    return NextResponse.json(
      { error: "Invalid request body", errors: data.error },
      { status: 400 },
    );
  }

  const license = await prisma.license.create({
    data: {
      maxIps: data.data.maxIps,
      expiresAt: data.data.expiresAt
        ? new Date(data.data.expiresAt)
        : undefined,
      productId: parseInt(params.product),
      userId: data.data.userId,
    },
  });

  return NextResponse.json(license);
});
