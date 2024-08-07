"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import type { License as LicenseType } from "@prisma/client";
import axios from "axios";
import Link from "next/link";

export function License({ license }: { license: LicenseType }) {
  return (
    <Link href={`/licenses/${license.key}`}>
      <Card>
        <CardHeader>
          <CardTitle>{license.key}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}

export function UpdateLicense({
  license,
  users,
}: {
  license: LicenseType;
  users: {
    id: string;
    name: string | null;
    email: string | null;
  }[];
}) {
  const { toast } = useToast();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const data = new FormData(e.target as HTMLFormElement);
        const maxIps = data.get("maxIps") as string;
        const expiresAt = data.get("expiresAt") as string | null;
        const userId = data.get("userId") as string | null;

        axios
          .patch(`/api/products/${license.productId}/licenses/${license.key}`, {
            maxIps: parseInt(maxIps),
            expiresAt: expiresAt
              ? new Date(expiresAt).toISOString().split("T")[0]
              : undefined,
            userId: userId || undefined,
          })
          .then(() => {
            toast({
              description: "License updated",
            });

            setTimeout(() => {
              window.location.reload();
            }, 500);
          })
          .catch((error) => {
            alert(error.response.data.error);
          });
      }}
    >
      <div className="flex gap-3">
        <Input
          type="number"
          name="maxIps"
          placeholder="Max Ips"
          defaultValue={license.maxIps}
        />
        <Input
          type="date"
          name="expiresAt"
          defaultValue={license.expiresAt?.toISOString().split("T")[0]}
        />
      </div>

      <Select defaultValue={license.userId ?? undefined} name="userId">
        <SelectTrigger className="mt-3 w-full">
          <SelectValue placeholder="User" />
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name} - {user.email}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className="mt-3 w-full">Save</Button>
    </form>
  );
}
