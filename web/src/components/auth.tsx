import { signIn, signOut } from "@/lib/auth";
import { Button } from "./ui/button";

export function Login({ className }: { className?: string }) {
  return (
    <form
      action={async () => {
        "use server";

        await signIn("discord");
      }}
    >
      <Button type="submit" className={className}>
        Login
      </Button>
    </form>
  );
}

export function Logout({ className }: { className?: string }) {
  return (
    <form
      action={async () => {
        "use server";

        await signOut();
      }}
    >
      <Button type="submit" className={className}>
        Logout
      </Button>
    </form>
  );
}
