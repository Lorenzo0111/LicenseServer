import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async (req, { params }) => {
  if (!params?.id || typeof params.id !== "string")
    return NextResponse.json(
      { message: "Invalid product ID" },
      { status: 400 },
    );

  if (!req.auth?.user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: req.auth.user.id },
    select: { admin: true },
  });

  if (!user?.admin)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const licenses = await prisma.license.findMany({
    where: {
      productId: parseInt(params.id) || -1,
    },
  });

  return NextResponse.json(licenses);
});
