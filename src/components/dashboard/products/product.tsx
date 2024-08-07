import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product as ProductType } from "@prisma/client";

export function Product({
  product,
  licenses,
}: {
  product: ProductType;
  licenses: number;
}) {
  return (
    <Card className="w-52">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>
          <span className="font-bold">{licenses}</span> active licenses
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
