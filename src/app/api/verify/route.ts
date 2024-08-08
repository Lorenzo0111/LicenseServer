import { keySchema } from "@/lib/backend";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const json = await req.json();
  const data = keySchema.safeParse(json);

  if (!data.success) {
    return NextResponse.json(
      { error: "Invalid request body", errors: data.error },
      { status: 400 },
    );
  }

  const license = await prisma.license.findUnique({
    where: {
      key: data.data.key,
      expiresAt: {
        gt: new Date(),
      },
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!license)
    return NextResponse.json({ error: "License not found" }, { status: 404 });

  const ip =
    req.ip ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for");

  if (ip && !license.ips.includes(ip)) {
    if (license.ips.length >= license.maxIps)
      return NextResponse.json({ error: "Max IPs reached" }, { status: 400 });

    await prisma.license.update({
      where: { key: data.data.key },
      data: {
        ips: {
          push: ip,
        },
      },
    });
  }

  await prisma.license.update({
    where: { key: data.data.key },
    data: {
      lastUsed: new Date(),
    },
  });

  return NextResponse.json({
    success: true,
    username: license.user?.name || null,
  });
};
