import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

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
