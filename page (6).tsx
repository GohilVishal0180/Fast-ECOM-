import { notFound } from "next/navigation"
import { Star, Truck, Shield, RefreshCcw } from "lucide-react"

import { ProductGallery } from "@/components/product-gallery"
import { AddToCart } from "@/components/add-to-cart"
import { Reviews } from "@/components/reviews"
import { RelatedProducts } from "@/components/related-products"
import { formatPrice } from "@/lib/utils"
import prisma from "@/lib/prisma"

interface ProductPageProps {
  params: {
    productId: string
  }
}

async function getProduct(productId: string) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
      status: "ACTIVE",
    },
    include: {
      seller: {
        select: {
          businessName: true,
          verified: true,
        },
      },
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })

  if (!product) {
    return null
  }

  return product
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.productId)

  if (!product) {
    notFound()
  }

  const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Gallery */}
          <ProductGallery images={product.images} />

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">प्रोडक्ट जानकारी</h2>
              <p className="text-3xl tracking-tight">{formatPrice(product.price)}</p>
            </div>

            <div className="mt-3">
              <h2 className="sr-only">रिव्यू</h2>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star
                      key={rating}
                      className={`h-5 w-5 ${
                        rating < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="ml-3 text-sm text-gray-500">{product.reviews.length} रिव्यू</p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="sr-only">विक्रेता</h2>
              <div className="flex items-center">
                <p className="text-sm text-gray-500">विक्रेता:</p>
                <p className="ml-2 text-sm font-medium text-gray-900">
                  {product.seller.businessName}
                  {product.seller.verified && (
                    <span className="ml-1 inline-block rounded-full bg-blue-500 p-0.5 text-[8px] text-white">✓</span>
                  )}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">विवरण</h3>
              <div className="space-y-6 text-base text-gray-700">{product.description}</div>
            </div>

            <div className="mt-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                  <Truck className="h-6 w-6 text-blue-600" />
                  <p className="text-sm font-medium">फ्री डिलीवरी</p>
                  <p className="text-xs text-gray-500">2-3 दिन में</p>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <p className="text-sm font-medium">वारंटी</p>
                  <p className="text-xs text-gray-500">1 साल की वारंटी</p>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                  <RefreshCcw className="h-6 w-6 text-blue-600" />
                  <p className="text-sm font-medium">आसान रिटर्न</p>
                  <p className="text-xs text-gray-500">7 दिन में</p>
                </div>
              </div>
            </div>

            <AddToCart productId={product.id} stock={product.stock} />
          </div>
        </div>

        <Reviews productId={product.id} reviews={product.reviews} averageRating={averageRating} />

        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
    </div>
  )
}

