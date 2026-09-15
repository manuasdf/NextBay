'use client'

import { useSearchParams } from 'next/navigation'
import { Field, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'

type FilterFormProps = {
  hasFilters: boolean
}

export function FilterForm({ hasFilters }: FilterFormProps) {
  const searchParams = useSearchParams()

  function getParam(value: string | null): string | undefined {
    return value ?? undefined
  }

  const status = getParam(searchParams.get('status'))
  const minPriceParam = getParam(searchParams.get('minPrice'))
  const maxPriceParam = getParam(searchParams.get('maxPrice'))
  const sort = getParam(searchParams.get('sort'))

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" action="">
      <Field>
        <FieldLabel htmlFor="status">Status</FieldLabel>
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
      </Field>
      <Field>
        <FieldLabel htmlFor="minPrice">Min Price</FieldLabel>
        <input
          type="number"
          name="minPrice"
          id="minPrice"
          placeholder="0"
          defaultValue={minPriceParam ?? ''}
          className="w-full px-3 py-2 bg-input text-foreground rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="maxPrice">Max Price</FieldLabel>
        <input
          type="number"
          name="maxPrice"
          id="maxPrice"
          placeholder="No limit"
          defaultValue={maxPriceParam ?? ''}
          className="w-full px-3 py-2 bg-input text-foreground rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="sort">Sort By</FieldLabel>
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
      </Field>
      <div className="md:col-span-2 lg:col-span-4 flex items-end gap-4">
        <Button type="submit" className="rounded-md">
          Apply Filters
        </Button>
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
  )
}
