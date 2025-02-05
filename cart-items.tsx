"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { toast } from "sonner"

interface CartItemsProps {
  items: {
    id: string
    quantity: number
    product: {
      id: string
      name: string
      price: number
      images: string[]
      stock: number
      seller: {
        businessName: string
        verified: boolean
      }
    }
  }[]
}

export function CartItems({ items }: CartItemsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string[]>([])

  const onQuantityChange = async (itemId: string, quantity: number) => {
    try {
      setLoading((prev) => [...prev, itemId])

      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
          quantity,
        }),
      })

      if (!response.ok) {
        throw new Error()
      }

      router.refresh()
    } catch (error) {
      toast.error("कुछ गलत हो गया")
    } finally {
      setLoading((prev) => prev.filter((id) => id !== itemId))
    }
  }

  const onRemove = async (itemId: string) => {
    try {
      setLoading((prev) => [...prev, itemId])

      const response = await fetch(`/api/cart?itemId=${itemId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error()
      }

      router.refresh()
      toast.success("प्रोडक्ट हटा दिया गया")
    } catch (error) {
      toast.error("कुछ गलत हो गया")
    } finally {
      setLoading((prev) => prev.filter((id) => id !== itemId))
    }
  }

  return (
    <ul className="divide-y">
      {items.map((item) => (
        <li key={item.id} className="flex py-6">
          <div className="flex-shrink-0">
            <Link href={`/products/${item.product.id}`}>
              <Image
                src={item.product.images[0] || "/placeholder.svg"}
                alt={item.product.name}
                width={100}
                height={100}
                className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
              />
            </Link>
          </div>

          <div className="ml-4 flex flex-1 flex-col sm:ml-6">
            <div>
              <div className="flex justify-between">
                <h4 className="font-medium">
                  <Link href={`/products/${item.product.id}`}>{item.product.name}</Link>
                </h4>
                <p className="ml-4 font-medium">{formatPrice(item.product.price * item.quantity)}</p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                विक्रेता: {item.product.seller.businessName}
                {item.product.seller.verified && (
                  <span className="ml-1 inline-block rounded-full bg-blue-500 p-0.5 text-[8px] text-white">✓</span>
                )}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{formatPrice(item.product.price)} प्रति इकाई</p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                  disabled={loading.includes(item.id) || item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                  disabled={loading.includes(item.id) || item.quantity >= item.product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600"
                onClick={() => onRemove(item.id)}
                disabled={loading.includes(item.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

