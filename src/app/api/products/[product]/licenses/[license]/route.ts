import { admin } from "@/lib/backend";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requestSchema } from "../route";

export const PATCH = admin(async (req, { params }) => {
  if (
    !params?.product ||
    typeof params.product !== "string" ||
    !params.license ||
    typeof params.license !== "string"
  )
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
      productId: parseInt(params.product) || -1,
      key: params.license,
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
  if (
    !params?.product ||
    typeof params.product !== "string" ||
    !params.license ||
    typeof params.license !== "string"
  )
    return NextResponse.json({ error: "Invalid license ID" }, { status: 400 });

  const license = await prisma.license.delete({
    where: {
      productId: parseInt(params.product) || -1,
      key: params.license,
    },
  });

  return NextResponse.json(license);
});