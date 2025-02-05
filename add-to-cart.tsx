"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface AddToCartProps {
  productId: string
  stock: number
}

export function AddToCart({ productId, stock }: AddToCartProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)

  const onAddToCart = async () => {
    try {
      setLoading(true)

      if (!session) {
        router.push("/login")
        return
      }

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      })

      if (!response.ok) {
        throw new Error()
      }

      router.refresh()
      toast.success("कार्ट में जोड़ा गया")
    } catch (error) {
      toast.error("कुछ गलत हो गया")
    } finally {
      setLoading(false)
    }
  }

  const onBuyNow = () => {
    if (!session) {
      router.push("/login")
      return
    }

    router.push(`/checkout?items=${productId},${quantity}`)
  }

  const onIncrement = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1)
    }
  }

  const onDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="mt-10 lg:mt-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-md border">
          <Button variant="ghost" size="icon" onClick={onDecrement} disabled={quantity <= 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button variant="ghost" size="icon" onClick={onIncrement} disabled={quantity >= stock}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{stock} उपलब्ध</p>
      </div>

      <div className="mt-6 flex gap-4">
        <Button onClick={onAddToCart} disabled={loading} className="flex-1">
          <ShoppingCart className="mr-2 h-4 w-4" />
          कार्ट में जोड़ें
        </Button>
        <Button onClick={onBuyNow} disabled={loading} variant="secondary" className="flex-1">
          अभी खरीदें
        </Button>
      </div>
    </div>
  )
}

