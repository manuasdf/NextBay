'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

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
          We couldn&apos;t load this auction. Please try again.
        </p>
        <div className="flex gap-4">
          <Button
            type="button"
            onClick={reset}
            className="rounded-md"
          >
            Try again
          </Button>
          <Link
            href="/auctions"
            className="px-4 py-2 bg-card text-foreground rounded-md border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Back to auctions
          </Link>
        </div>
      </div>
    </div>
  )
}
