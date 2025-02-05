import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <div className="aspect-square w-full">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>

        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="mt-4 h-6 w-24" />
          <div className="mt-4 flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-4 mr-1" />
              ))}
            </div>
            <Skeleton className="ml-2 h-4 w-20" />
          </div>
          <Skeleton className="mt-8 h-32" />
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
          <div className="mt-8 flex gap-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

