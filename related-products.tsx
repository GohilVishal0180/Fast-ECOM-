import { ProductCard } from "@/components/ui/product-card"
import prisma from "@/lib/prisma"
import type { Category } from "@prisma/client"

interface RelatedProductsProps {
  currentProductId: string
  category: Category
}

export async function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const products = await prisma.product.findMany({
    where: {
      category,
      status: "ACTIVE",
      id: {
        not: currentProductId,
      },
    },
    include: {
      seller: {
        select: {
          businessName: true,
          verified: true,
        },
      },
    },
    take: 4,
  })

  return (
    <div className="mt-16 lg:mt-20">
      <h2 className="text-lg font-medium">संबंधित प्रोडक्ट्स</h2>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

