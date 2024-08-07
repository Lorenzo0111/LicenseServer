import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { License as LicenseType } from "@prisma/client";
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
