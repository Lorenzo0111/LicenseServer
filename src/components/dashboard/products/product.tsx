"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import type { Product as ProductType } from "@prisma/client";
import axios from "axios";
import { Plus } from "lucide-react";
import Link from "next/link";

export function Product({
  product,
  licenses,
}: {
  product: ProductType;
  licenses: number;
}) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="w-52">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>
            <span className="font-bold">{licenses}</span> active licenses
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export function CreateProduct() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new product</DialogTitle>
          <DialogDescription>
            Enter the product details to create it
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const data = new FormData(e.target as HTMLFormElement);
            const name = data.get("name") as string;

            axios
              .put(`/api/products`, { name })
              .then(() => {
                window.location.reload();
              })
              .catch((error) => {
                alert(error.response.data.error);
              });
          }}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Example" />
            </div>
          </div>

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
