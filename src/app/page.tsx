import Login from "@/components/auth/login";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getProducts() {
  return await prisma.product.findMany();
}

export default async function Home() {
  const session = await auth();

  if (!session?.user)
    return (
      <main className="m-auto">
        <Login />
      </main>
    );

  const products = await getProducts();

  return (
    <main>
      {products.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </main>
  );
}
