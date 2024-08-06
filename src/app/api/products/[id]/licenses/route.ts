import { admin } from "@/lib/backend";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = admin(async (_, { params }) => {
  if (!params?.id || typeof params.id !== "string")
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });

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
export const PUT = admin(async (req, { params }) => {
  if (!params?.id || typeof params.id !== "string")
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
      productId: parseInt(params.id),
      userId: data.data.userId,
    },
  });

  return NextResponse.json(license);
});

export const PATCH = admin(async (req, { params }) => {
  if (!params?.id || typeof params.id !== "string")
    return NextResponse.json({ error: "Invalid license ID" }, { status: 400 });

  const json = await req.json();
  const data = requestSchema.safeParse(json);

  if (!data.success) {
    return NextResponse.json(
      { error: "Invalid request body", errors: data.error },
      { status: 400 },
    );
  }

  const license = await prisma.license.update({
    where: {
      productId: parseInt(params.id) || -1,
      key: req.nextUrl.searchParams.get("key") || "",
    },
    data: {
      maxIps: data.data.maxIps,
      expiresAt: new Date(data.data.expiresAt),
      userId: data.data.userId,
    },
  });

  return NextResponse.json(license);
});

export const DELETE = admin(async (req, { params }) => {
  if (!params?.id || typeof params.id !== "string")
    return NextResponse.json({ error: "Invalid license ID" }, { status: 400 });

  const key = req.nextUrl.searchParams.get("key");
  if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });

  const license = await prisma.license.delete({
    where: {
      productId: parseInt(params.id) || -1,
      key,
    },
  });

  return NextResponse.json(license);
});
