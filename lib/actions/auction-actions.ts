"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ApiError } from "@/lib/api/fetch-api";
import { auctionsService } from "@/lib/services/auctions-service";
import type { CreateAuctionInput } from "@/types/auction";

export async function createAuctionAction(
  input: CreateAuctionInput,
): Promise<{ error?: string }> {
  let auctionId: string;
  try {
    const auction = await auctionsService.createAuction(input);
    auctionId = auction.id;
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message };
    }
    return { error: "Failed to create auction. Please try again." };
  }

  revalidatePath("/auctions");
  redirect(`/auctions/${auctionId}`);
}
