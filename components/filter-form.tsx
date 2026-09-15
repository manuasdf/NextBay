'use client'

import { useSearchParams } from 'next/navigation'
import { Field, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
        <Select name="status" defaultValue={status || ''}>
          <SelectTrigger className="w-full rounded-md">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor="minPrice">Min Price</FieldLabel>
        <Input
          type="number"
          name="minPrice"
          id="minPrice"
          placeholder="0"
          defaultValue={minPriceParam ?? ''}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="maxPrice">Max Price</FieldLabel>
        <Input
          type="number"
          name="maxPrice"
          id="maxPrice"
          placeholder="No limit"
          defaultValue={maxPriceParam ?? ''}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="sort">Sort By</FieldLabel>
        <Select name="sort" defaultValue={sort || ''}>
          <SelectTrigger className="w-full rounded-md">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Default</SelectItem>
            <SelectItem value="ending-soon">Ending Soon</SelectItem>
            <SelectItem value="ending-late">Ending Late</SelectItem>
          </SelectContent>
        </Select>
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
