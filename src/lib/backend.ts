import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { prisma } from "./prisma";

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
  auth(async (req, context) => {
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

export async function isAdmin(id: string) {
  return await prisma.user
    .findUnique({
      where: {
        id,
      },
      select: { admin: true },
    })
    .then((user) => user?.admin ?? false);
}
