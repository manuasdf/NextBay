import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth/session";

export default async function SettingsPage() {
  if (!(await isAuthenticated())) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <h1>Settings page</h1>
    </div>
  );
}
