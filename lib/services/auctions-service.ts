import { fetchAPI } from '@/lib/api/fetch-api'
import type { Auction, AuctionListResponse, AuctionQueryParams, CreateAuctionInput } from '@/types/auction'
import type { Offer } from '@/types/offer'

function buildAuctionQuery(params: AuctionQueryParams = {}): string {
  const search = new URLSearchParams()
  if (params.page) search.set('page', String(params.page))
  if (params.limit) search.set('limit', String(params.limit))
  if (params.status) search.set('status', params.status)
  if (params.minPrice !== undefined) search.set('min-price', String(params.minPrice))
  if (params.maxPrice !== undefined) search.set('max-price', String(params.maxPrice))
  if (params.sort) search.set('sort', params.sort)
  const query = search.toString()
  return query ? `?${query}` : ''
}

export const auctionsService = {
  getAuctions(params?: AuctionQueryParams): Promise<AuctionListResponse> {
    return fetchAPI<AuctionListResponse>(`/auctions${buildAuctionQuery(params)}`)
  },
  getAuctionById(id: string): Promise<Auction> {
    return fetchAPI<Auction>(`/auctions/${id}`)
  },
  getAuctionOffers(id: string): Promise<Offer[]> {
    return fetchAPI<Offer[]>(`/auctions/${id}/offers`)
  },
  createAuction(input: CreateAuctionInput): Promise<Auction> {
    return fetchAPI<Auction>('/auctions', { method: 'POST', body: JSON.stringify(input) })
  },
  placeOffer(auctionId: string, amount: number): Promise<Offer> {
    return fetchAPI<Offer>(`/auctions/${auctionId}/offers`, {
      method: 'POST',
      body: JSON.stringify({ amount }),
    })
  }
}
