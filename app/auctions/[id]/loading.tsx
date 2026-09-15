import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-1 container max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Skeleton className="h-8 w-2/3" />
                        <Skeleton className="h-32 w-full rounded-xl" />
                        <Skeleton className="h-48 w-full rounded-xl" />
                    </div>
                    <Skeleton className="h-80 rounded-xl" />
                </div>
            </main>
        </div>
    )
}
