import { notFound } from 'next/navigation'
import { ApiError } from '@/lib/api/fetch-api'
import { auctionsService } from '@/lib/services/auctions-service'
import { getSession } from '@/lib/auth/session'
import { OfferForm } from '@/components/auctions/offer-form'
import type { Auction } from '@/types/auction'

export default async function AuctionDetailPage(props: PageProps<'/auctions/[id]'>) {
  const { id } = await props.params

  let auction: Auction
  try {
    auction = await auctionsService.getAuctionById(id)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound()
    }
    throw error
  }

  const [offers, session] = await Promise.all([
    auctionsService.getAuctionOffers(id),
    getSession(),
  ])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 py-8 flex-1 max-w-3xl">
        <header className="mb-8">
          <div className="flex justify-between items-start gap-4 mb-2">
            <h1 className="text-3xl font-bold text-foreground">{auction.title}</h1>
            <span
              className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                auction.status === 'open'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
              }`}
            >
              {auction.status}
            </span>
          </div>
          <p className="text-muted-foreground">{auction.description}</p>
        </header>

        <div className="bg-card rounded-lg p-6 shadow-sm border border-border mb-8 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Current Price</span>
            <span className="text-2xl font-bold text-foreground">
              ${auction.currentPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Starting Price</span>
            <span className="text-foreground text-sm">
              ${auction.startingPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Ends</span>
            <span className="text-foreground text-sm">
              {new Date(auction.endDate).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Seller</span>
            <span className="text-foreground text-sm">{auction.seller.username}</span>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm border border-border mb-8">
          <OfferForm
            auctionId={auction.id}
            currentPrice={auction.currentPrice}
            isAuthenticated={session !== null}
            isSeller={session?.id === auction.seller.id}
            isOpen={auction.status === 'open'}
          />
        </div>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Bid History {offers.length > 0 && `(${offers.length})`}
          </h2>
          {offers.length === 0 ? (
            <p className="text-muted-foreground text-sm">No bids yet</p>
          ) : (
            <ul className="space-y-2">
              {offers.map((offer) => (
                <li
                  key={offer.id}
                  className="bg-card rounded-lg p-4 shadow-sm border border-border flex justify-between items-center"
                >
                  <span className="text-foreground text-sm">{offer.bidder.username}</span>
                  <div className="text-right">
                    <div className="text-foreground font-semibold">
                      ${offer.amount.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {new Date(offer.createdAt).toLocaleString()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
