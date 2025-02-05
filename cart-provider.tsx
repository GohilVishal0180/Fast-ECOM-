"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { CartItem } from "@/types"

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart")
        const data = await res.json()
        setItems(data.items || [])
      } catch (error) {
        console.error("Failed to fetch cart:", error)
      }
    }

    fetchCart()
  }, [])

  const addItem = async (item: CartItem) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.product.id,
          quantity: item.quantity,
        }),
      })

      if (!res.ok) throw new Error("Failed to add item")

      setItems((prev) => {
        const exists = prev.find((i) => i.product.id === item.product.id)
        if (exists) {
          return prev.map((i) =>
            i.product.id === item.product.id ? { ...i, quantity: i.quantity + item.quantity } : i,
          )
        }
        return [...prev, item]
      })
    } catch (error) {
      console.error("Failed to add item:", error)
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      const res = await fetch(`/api/cart?itemId=${itemId}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Failed to remove item")

      setItems((prev) => prev.filter((item) => item.id !== itemId))
    } catch (error) {
      console.error("Failed to remove item:", error)
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity }),
      })

      if (!res.ok) throw new Error("Failed to update quantity")

      setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
    } catch (error) {
      console.error("Failed to update quantity:", error)
    }
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

