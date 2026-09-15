'use client'

import Link from 'next/link'

interface AuctionErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AuctionError({ reset }: AuctionErrorProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h1>
        <p className="text-muted-foreground mb-6">
          We couldn&apos;t load auctions. Please try again.
        </p>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
