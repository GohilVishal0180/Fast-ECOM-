"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface CartSummaryProps {
  items: {
    quantity: number
    product: {
      price: number
    }
  }[]
}

export function CartSummary({ items }: CartSummaryProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const subtotal = items.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)

  const deliveryFee = subtotal >= 499 ? 0 : 40

  const total = subtotal + deliveryFee

  const onCheckout = () => {
    setLoading(true)
    router.push("/checkout")
  }

  return (
    <div className="rounded-lg border bg-white p-6">
      <h2 className="text-lg font-medium">ऑर्डर सारांश</h2>
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">सब टोटल</div>
          <div className="font-medium">{formatPrice(subtotal)}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">डिलीवरी</div>
            {deliveryFee === 0 && (
              <div className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-600">फ्री</div>
            )}
          </div>
          <div className="font-medium">{deliveryFee > 0 ? formatPrice(deliveryFee) : "फ्री"}</div>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-medium">
          <div>टोटल</div>
          <div>{formatPrice(total)}</div>
        </div>
        {deliveryFee > 0 && <div className="text-sm text-muted-foreground">₹499 से ज्यादा की खरीदारी पर फ्री डिलीवरी</div>}
        <Button onClick={onCheckout} disabled={loading} className="w-full">
          चेकआउट
        </Button>
      </div>
    </div>
  )
}

