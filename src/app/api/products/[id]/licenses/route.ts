import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = auth(async (req, { params }) => {
  if (!params?.id || typeof params.id !== "string")
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });

  if (!req.auth?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: req.auth.user.id },
    select: { admin: true },
  });

  if (!user?.admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const licenses = await prisma.license.findMany({
    where: {
      productId: parseInt(params.id) || -1,
    },
  });

  return NextResponse.json(licenses);
});

const requestSchema = z.object({
  maxIps: z.number().int().positive().max(999),
  expiresAt: z.string().date(),
  userId: z.string().optional(),
});
export const PUT = auth(async (req, { params }) => {
  if (!params?.id || typeof params.id !== "string")
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });

  if (!req.auth?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: req.auth.user.id },
    select: { admin: true },
  });

  if (!user?.admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
      productId: parseInt(params.id),
      userId: data.data.userId,
    },
  });

  return NextResponse.json(license);
});
