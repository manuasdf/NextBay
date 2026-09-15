import { auctionsService } from '@/lib/services/auctions-service'
import type { AuctionListResponse, AuctionQueryParams } from '@/types/auction'

interface AuctionsPageProps {
  searchParams: AuctionQueryParams
}

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 12

export default async function AuctionsPage({ searchParams }: AuctionsPageProps) {
  const page = searchParams.page ?? DEFAULT_PAGE
  const limit = searchParams.limit ?? DEFAULT_LIMIT
  const status = searchParams.status
  const minPrice = searchParams.minPrice
  const maxPrice = searchParams.maxPrice
  const sort = searchParams.sort

  const params: AuctionQueryParams = {
    page,
    limit,
    status,
    minPrice,
    maxPrice,
    sort,
  }

  let auctionsResponse: AuctionListResponse
  try {
    auctionsResponse = await auctionsService.getAuctions(params)
  } catch (error) {
    auctionsResponse = { data: [], meta: { page: 1, limit: DEFAULT_LIMIT, total: 0, totalPages: 0 } }
  }

  const { data: auctions, meta } = auctionsResponse
  const { total, totalPages } = meta

  const hasFilters = status || minPrice !== undefined || maxPrice !== undefined

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 py-8 flex-1">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Auctions</h1>
          <p className="text-muted-foreground mt-1">
            {total} {total === 1 ? 'auction' : 'auctions'} found
            {hasFilters && ' (filtered)'}
          </p>
        </header>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Filters</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" action="">
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium text-foreground">
                Status
              </label>
              <select
                name="status"
                id="status"
                defaultValue={status || ''}
                className="w-full px-3 py-2 bg-input text-foreground rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">All Statuses</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="minPrice" className="text-sm font-medium text-foreground">
                Min Price
              </label>
              <input
                type="number"
                name="minPrice"
                id="minPrice"
                placeholder="0"
                defaultValue={minPrice ?? ''}
                className="w-full px-3 py-2 bg-input text-foreground rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="maxPrice" className="text-sm font-medium text-foreground">
                Max Price
              </label>
              <input
                type="number"
                name="maxPrice"
                id="maxPrice"
                placeholder="No limit"
                defaultValue={maxPrice ?? ''}
                className="w-full px-3 py-2 bg-input text-foreground rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="sort" className="text-sm font-medium text-foreground">
                Sort By
              </label>
              <select
                name="sort"
                id="sort"
                defaultValue={sort || ''}
                className="w-full px-3 py-2 bg-input text-foreground rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Default</option>
                <option value="ending-soon">Ending Soon</option>
                <option value="ending-late">Ending Late</option>
              </select>
            </div>
            <div className="md:col-span-2 lg:col-span-4 flex items-end gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Apply Filters
              </button>
              {hasFilters && (
                <a
                  href="/auctions"
                  className="px-4 py-2 text-foreground underline hover:no-underline"
                >
                  Clear Filters
                </a>
              )}
            </div>
          </form>
        </div>

        {/* Auction List */}
        {auctions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No auctions found</p>
            {hasFilters && (
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your filters
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {auctions.map((auction) => (
              <div
                key={auction.id}
                className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-foreground truncate">{auction.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      auction.status === 'open'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}
                  >
                    {auction.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{auction.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Current Price</span>
                    <span className="text-lg font-bold text-foreground">
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
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="flex justify-center items-center gap-4">
            {page > 1 && (
              <a
                href={`/auctions?${buildQueryString({ ...searchParams, page: page - 1 })}`}
                className="px-4 py-2 bg-card text-foreground rounded-md border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Previous
              </a>
            )}
            <span className="text-muted-foreground text-sm">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <a
                href={`/auctions?${buildQueryString({ ...searchParams, page: page + 1 })}`}
                className="px-4 py-2 bg-card text-foreground rounded-md border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Next
              </a>
            )}
          </nav>
        )}
      </div>
    </div>
  )
}

function buildQueryString(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      search.set(key, String(value))
    }
  }
  return search.toString()
}
