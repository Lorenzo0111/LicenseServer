import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = auth(async (req, { params }) => {
  if (!req.auth?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (
    !params?.product ||
    typeof params.product !== "string" ||
    !params.license ||
    typeof params.license !== "string"
  )
    return NextResponse.json({ error: "Invalid license ID" }, { status: 400 });

  const ip = req.nextUrl.searchParams.get("ip");
  if (!ip) return NextResponse.json({ error: "Invalid IP" }, { status: 400 });

  let license = await prisma.license.findUnique({
    where: {
      productId: parseInt(params.product) || -1,
      key: params.license,
    },
    select: {
      ips: true,
      userId: true,
    },
  });

  if (!license)
    return NextResponse.json({ error: "License not found" }, { status: 404 });

  const user = await prisma.user.findUnique({
    where: { id: req.auth.user.id },
    select: { admin: true },
  });

  if (!user?.admin && license.userId !== req.auth.user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  license = await prisma.license.update({
    where: {
      productId: parseInt(params.product) || -1,
      key: params.license,
    },
    data: {
      ips: license.ips.filter((i) => i !== ip),
    },
  });

  return NextResponse.json(license);
});
