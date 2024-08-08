import { admin, adminSchema } from "@/lib/backend";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = admin(async (_, { params }) => {
  if (!params?.user || typeof params.user !== "string")
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });

  const user = await prisma.user.findUnique({
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

  return NextResponse.json(user);
});

export const PATCH = admin(async (req, { params }) => {
  if (!params?.user || typeof params.user !== "string")
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });

  const json = await req.json();
  const data = adminSchema.safeParse(json);

  if (!data.success)
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );

  await prisma.user.update({
    where: {
      id: params.user,
    },
    data: {
      admin: data.data.admin,
    },
  });

  return NextResponse.json({ success: true });
});
