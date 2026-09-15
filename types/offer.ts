import type { UserSummary } from "./user";

export interface Offer {
  id: string;
  amount: number;
  bidder: UserSummary;
  createdAt: string;
}
