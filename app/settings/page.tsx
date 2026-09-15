import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <h1>Settings page</h1>
    </div>
  );
}
