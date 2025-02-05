"use client"

import { useEffect } from "react"
import { ErrorMessage } from "@/components/error-message"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[400px] items-center justify-center p-6">
      <div className="text-center">
        <ErrorMessage title="कुछ गलत हो गया" message="कृपया पेज को रीफ्रेश करें या बाद में पुनः प्रयास करें" />
        <Button variant="outline" onClick={reset} className="mt-4">
          पुनः प्रयास करें
        </Button>
      </div>
    </div>
  )
}

