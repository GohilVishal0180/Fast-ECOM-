import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <Skeleton className="mx-auto h-16 w-16 rounded-full" />
        <Skeleton className="mx-auto mt-4 h-8 w-48" />
        <Skeleton className="mx-auto mt-2 h-6 w-64" />
        <Skeleton className="mx-auto mt-4 h-4 w-32" />
      </div>

      <div className="mt-12 rounded-lg border bg-white px-6 py-8">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-1 h-5 w-32" />
          </div>
          <div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-1 h-5 w-32" />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="mt-2 h-4 w-16" />
              </div>
            ))}
          </div>
          <Skeleton className="mt-4 h-1 w-full" />
        </div>

        <div className="mt-6">
          <div className="flow-root">
            <ul className="-my-6 divide-y">
              {[1, 2].map((item) => (
                <li key={item} className="flex py-6">
                  <Skeleton className="h-24 w-24 rounded-md sm:h-32 sm:w-32" />
                  <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="h-5 w-24" />
                      </div>
                      <Skeleton className="mt-1 h-4 w-32" />
                      <Skeleton className="mt-1 h-4 w-24" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Skeleton className="my-6 h-px w-full" />

        <div className="space-y-4">
          <div>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-1 h-20 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-1 h-4 w-48" />
            <Skeleton className="mt-1 h-4 w-48" />
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </div>
  )
}

