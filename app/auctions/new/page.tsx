import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth/session";
import { CreateAuctionForm } from "@/components/auctions/create-auction-form";

export default async function NewAuctionPage() {
  if (!(await isAuthenticated())) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 py-8 flex-1 max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Create Auction
          </h1>
          <p className="text-muted-foreground mt-1">
            List your item for collectors to discover
          </p>
        </header>

        <CreateAuctionForm />
      </div>
    </div>
  );
}
