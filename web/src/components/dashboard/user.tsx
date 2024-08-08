"use client";

import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import axios from "axios";
import { cn } from "@/lib/utils";

export function User({
  user,
}: {
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
}) {
  return (
    <Link href={`/users/${user.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export function UpdateUserRole({
  user,
}: {
  user: {
    id: string;
    name: string | null;
    admin: boolean;
  };
}) {
  return (
    <button
      onClick={() => {
        axios
          .patch(`/api/users/${user.id}`, {
            admin: !user.admin,
          })
          .then(() => {
            window.location.reload();
          });
      }}
      className={cn(
        "rounded-xl px-2 text-sm",
        user.admin ? "bg-primary" : "bg-secondary",
      )}
    >
      {user.admin ? "ADMIN" : "USER"}
    </button>
  );
}
