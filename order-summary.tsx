"use client"

import { formatPrice } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface OrderSummaryProps {
  items: {
    quantity: number
    product: {
      name: string
      price: number
      seller: {
        businessName: string
        verified: boolean
      }
    }
  }[]
}

export function OrderSummary({ items }: OrderSummaryProps) {
  const subtotal = items.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)

  const deliveryFee = subtotal >= 499 ? 0 : 40

  const total = subtotal + deliveryFee

  return (
    <div className="rounded-lg border bg-white p-6">
      <h2 className="text-lg font-medium">ऑर्डर सारांश</h2>
      <div className="mt-4 space-y-4">
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.product.name} className="flex justify-between text-sm">
              <div>
                <div>{item.product.name}</div>
                <div className="text-muted-foreground">
                  {item.quantity} x {formatPrice(item.product.price)}
                </div>
                <div className="text-muted-foreground">
                  विक्रेता: {item.product.seller.businessName}
                  {item.product.seller.verified && (
                    <span className="ml-1 inline-block rounded-full bg-blue-500 p-0.5 text-[8px] text-white">✓</span>
                  )}
                </div>
              </div>
              <div className="font-medium">{formatPrice(item.product.price * item.quantity)}</div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div>सब टोटल</div>
            <div className="font-medium">{formatPrice(subtotal)}</div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div>डिलीवरी</div>
              {deliveryFee === 0 && (
                <div className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-600">फ्री</div>
              )}
            </div>
            <div className="font-medium">{deliveryFee > 0 ? formatPrice(deliveryFee) : "फ्री"}</div>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between font-medium">
          <div>टोटल</div>
          <div>{formatPrice(total)}</div>
        </div>

        {deliveryFee > 0 && <div className="text-sm text-muted-foreground">₹499 से ज्यादा की खरीदारी पर फ्री डिलीवरी</div>}
      </div>
    </div>
  )
}

