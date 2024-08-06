import { admin } from "@/lib/backend";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = admin(async (_, { params }) => {
  if (!params?.user || typeof params.user !== "string")
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });

  const users = await prisma.user.findUnique({
    where: {
      id: params.user,
    },
    select: {
      id: true,
      name: true,
      email: true,
      licenses: true,
    },
  });

  return NextResponse.json(users);
});
