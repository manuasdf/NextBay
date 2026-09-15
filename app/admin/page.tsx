import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (!session.roles.includes("admin")) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <h1>Hello Admin page</h1>
    </div>
  );
}
