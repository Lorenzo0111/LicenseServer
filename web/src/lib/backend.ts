import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { prisma } from "./prisma";
import { z } from "zod";

type NextAuthRequest = NextRequest & {
  auth: Session | null;
};

type AppRouteHandlerFnContext = {
  params?: Record<string, string | string[]>;
};

export const admin = (
  fun: (
    req: NextAuthRequest,
    context: AppRouteHandlerFnContext,
  ) => Promise<NextResponse>,
) =>
  auth(async (req: NextAuthRequest, context) => {
    const authToken = req.headers.get("Authorization");
    if (authToken && authToken.split(" ")[1] === process.env.BACKEND_SECRET)
      return fun(req, context);

    if (!req.auth?.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: req.auth.user.id },
      select: { admin: true },
    });

    if (!user?.admin)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    return fun(req, context);
  });

export async function isAdmin(id: string | null) {
  if (!id) return false;

  return await prisma.user
    .findUnique({
      where: {
        id,
      },
      select: { admin: true },
    })
    .then((user) => user?.admin ?? false);
}

export const nameSchema = z.object({
  name: z.string(),
});

export const adminSchema = z.object({
  admin: z.boolean(),
});

export const keySchema = z.object({
  key: z.string(),
});

export const licenseSchema = z.object({
  maxIps: z.number().int().positive().max(999),
  expiresAt: z.string().date().optional(),
  userId: z.string().optional(),
});
