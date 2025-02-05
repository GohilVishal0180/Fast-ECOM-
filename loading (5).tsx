import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-32" />
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <Skeleton className="h-10 w-[200px]" />

        <div className="space-y-8">
          {[1, 2, 3].map((order) => (
            <div key={order} className="rounded-lg border bg-white p-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="mt-1 h-4 w-24" />
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-4 w-16" />
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between">
                  {[1, 2, 3, 4].map((status) => (
                    <div key={status} className="flex flex-col items-center">
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
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    </div>
  )
}

