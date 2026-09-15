import Link from 'next/link'

export default function AuctionNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Auction not found</h1>
        <p className="text-muted-foreground mb-6">
          This auction doesn&apos;t exist or may have been removed.
        </p>
        <Link
          href="/auctions"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          Back to auctions
        </Link>
      </div>
    </div>
  )
}
