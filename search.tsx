"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SearchIcon, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ui/product-card"
import type { Product } from "@/types"

export function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data)
      } catch (error) {
        console.error("Search error:", error)
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(fetchResults, 300)
    return () => clearTimeout(debounce)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setShowResults(false)
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowResults(true)
          }}
          placeholder="प्रोडक्ट खोजें..."
          className="w-full pl-10 pr-4"
        />
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() => {
              setQuery("")
              setResults([])
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      <AnimatePresence>
        {showResults && (results.length > 0 || loading) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border bg-white p-4 shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : (
              <div className="grid gap-4">
                {results.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => {
                      router.push(`/products/${product.id}`)
                      setShowResults(false)
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

