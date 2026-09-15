import Link from 'next/link'

export default function AuctionNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Auction not found</h1>
        <p className="text-muted-foreground mb-6">
          There are no auctions or may have been removed.
        </p>
      </div>
    </div>
  )
}
