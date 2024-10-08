"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import type { License, License as LicenseType, Product } from "database/types";
import axios from "axios";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export function CreateLicense({
  products,
  users,
  product: productId,
}: {
  products: Product[];
  users: {
    id: string;
    name: string | null;
    email: string | null;
  }[];
  product?: number;
}) {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add license
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new license</DialogTitle>
          <DialogDescription>
            Enter the license details to create it
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const data = new FormData(e.target as HTMLFormElement);
            const product = productId || (data.get("product") as string);
            const maxIps = data.get("maxIps") as string;
            const expiresAt = data.get("expiresAt") as string | null;
            const userId = data.get("userId") as string | null;

            axios
              .put(`/api/products/${product}/licenses`, {
                maxIps: parseInt(maxIps),
                expiresAt: expiresAt
                  ? new Date(expiresAt).toISOString().split("T")[0]
                  : undefined,
                userId: userId || undefined,
              })
              .then((data) => {
                toast({
                  description: "License created",
                });

                router.push(`/licenses/${data.data.key}`);
              })
              .catch((error) => {
                alert(error.response.data.error);
              });
          }}
        >
          {!productId && (
            <Select name="product" required>
              <SelectTrigger className="mb-3 w-full">
                <SelectValue placeholder="Product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <div className="flex gap-3">
            <Input type="number" name="maxIps" placeholder="Max Ips" />
            <Input type="date" name="expiresAt" />
          </div>

          <Select name="userId">
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

          <DialogFooter>
            <Button className="mt-3" type="submit">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateLicense({
  license,
  users,
  disabled,
}: {
  license: LicenseType;
  users: {
    id: string;
    name?: string | null;
    email?: string | null;
  }[];
  disabled: boolean;
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
          disabled={disabled}
        />
        <Input
          type="date"
          name="expiresAt"
          defaultValue={license.expiresAt?.toISOString().split("T")[0]}
          disabled={disabled}
        />
      </div>

      <Select
        defaultValue={license.userId ?? undefined}
        name="userId"
        disabled={disabled}
      >
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

      <Button className="mt-3 w-full" disabled={disabled}>
        Save
      </Button>
    </form>
  );
}

export function LicenseIp({ license, ip }: { license: License; ip: string }) {
  const { toast } = useToast();

  return (
    <button
      onClick={() => {
        axios
          .delete(
            `/api/products/${license.productId}/licenses/${license.key}/ips?ip=${ip}`,
          )
          .then(() => {
            toast({
              description: "IP removed",
            });

            setTimeout(() => {
              window.location.reload();
            }, 500);
          });
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{ip}</CardTitle>
        </CardHeader>
      </Card>
    </button>
  );
}
