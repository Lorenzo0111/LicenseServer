import { signIn } from "@/lib/auth";
import { Button } from "../ui/button";

export default function Login() {
  return (
    <form
      action={async () => {
        "use server";

        await signIn("github");
      }}
    >
      <Button type="submit">Login</Button>
    </form>
  );
}
