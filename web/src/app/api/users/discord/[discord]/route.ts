import { admin } from "@/lib/backend";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = admin(async (_, { params }) => {
  if (!params?.discord || typeof params.discord !== "string")
    return NextResponse.json({ error: "Invalid discord ID" }, { status: 400 });

  const user = await prisma.user.findFirst({
    where: {
      accounts: {
        some: {
          provider: "discord",
          providerAccountId: params.discord,
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      licenses: true,
    },
  });

  return NextResponse.json(user);
});
