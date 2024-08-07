"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

export function UpdateLicense({ license }: { license: LicenseType }) {
  const { toast } = useToast();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const data = new FormData(e.target as HTMLFormElement);

        axios
          .patch(
            `/api/products/${license.productId}/licenses/${license.key}`,
            {},
          )
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
          defaultValue={license.expiresAt?.toString()}
        />
      </div>

      <Button className="mt-3 w-full">Save</Button>
    </form>
  );
}
