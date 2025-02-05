import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="h-8 w-48" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="divide-y">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex py-6">
                <Skeleton className="h-32 w-32 rounded-md" />
                <div className="ml-6 flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="mt-2 h-4 w-32" />
                  <Skeleton className="mt-2 h-4 w-24" />
                  <div className="mt-4 flex items-center justify-between">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="rounded-lg border bg-white p-6">
            <Skeleton className="h-6 w-32" />
            <div className="mt-4 space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
              <Skeleton className="h-px w-full" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

