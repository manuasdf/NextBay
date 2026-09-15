"use server";

import { revalidatePath } from "next/cache";
import { ApiError } from "@/lib/api/fetch-api";
import { auctionsService } from "@/lib/services/auctions-service";

export async function placeOfferAction(
  auctionId: string,
  amount: number,
): Promise<{ error?: string }> {
  try {
    await auctionsService.placeOffer(auctionId, amount);
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message };
    }
    return { error: "Failed to place offer. Please try again." };
  }

  revalidatePath(`/auctions/${auctionId}`);
  return {};
}
