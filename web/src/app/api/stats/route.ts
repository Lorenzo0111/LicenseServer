import { admin } from "@/lib/backend";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = admin(async (req) => {
  const type = req.nextUrl.searchParams.get("type");
  if (!type)
    return NextResponse.json({ error: "Type is required" }, { status: 400 });

  switch (type.toLowerCase()) {
    case "licenses":
      const licenses = await prisma.license.findMany({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear().toString()),
          },
        },
        select: {
          key: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return NextResponse.json(licenses);
    case "users":
      const users = await prisma.user.findMany({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear().toString()),
          },
        },
        select: {
          id: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return NextResponse.json(users);
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
});
