"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold">कुछ गलत हो गया</h2>
      <p className="mt-2 text-muted-foreground">माफ़ कीजिए, एक त्रुटि हुई है। कृपया पुनः प्रयास करें।</p>
      <Button onClick={reset} className="mt-4">
        पुनः प्रयास करें
      </Button>
    </div>
  )
}

