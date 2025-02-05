"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { useCart } from "@/providers/cart-provider"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [loading, setLoading] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = async () => {
    try {
      setLoading(true)
      await addItem({
        id: crypto.randomUUID(),
        product,
        quantity: 1,
      })
      toast.success("कार्ट में जोड़ा गया")
    } catch (error) {
      toast.error("कुछ गलत हो गया")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      {/* Previous product card code with loading state */}
      <Button onClick={handleAddToCart} disabled={loading} className="w-full">
        {loading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            कार्ट में जोड़ें
          </>
        )}
      </Button>
    </div>
  )
}

