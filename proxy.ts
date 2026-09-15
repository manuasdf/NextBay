import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Optimistic check only (cookie presence, not signature/expiry) so the
  // proxy stays fast. The real boundary is DarkBay re-verifying the JWT on
  // every request; getSession()/isAuthenticated() do the same server-side
  // before any protected data or mutation is reachable.
  const token = request.cookies.get("darkbay_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/auctions/new"],
};
