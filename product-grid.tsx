"use client"

import type { Product } from "@prisma/client"
import { ProductCard } from "@/components/ui/product-card"

interface ProductGridProps {
  products: (Product & {
    seller: {
      businessName: string
      verified: boolean
    }
  })[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

