import { Category } from "@prisma/client"

import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"

interface ProductsPageProps {
  searchParams: {
    category?: string
    sort?: string
    minPrice?: string
    maxPrice?: string
    query?: string
    page?: string
  }
}

async function getProducts(searchParams: ProductsPageProps["searchParams"]) {
  const { category, sort, minPrice, maxPrice, query, page } = searchParams

  const url = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`)

  if (category) url.searchParams.append("category", category)
  if (sort) url.searchParams.append("sort", sort)
  if (minPrice) url.searchParams.append("minPrice", minPrice)
  if (maxPrice) url.searchParams.append("maxPrice", maxPrice)
  if (query) url.searchParams.append("query", query)
  if (page) url.searchParams.append("page", page)

  const res = await fetch(url, { cache: "no-store" })
  return res.json()
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { products } = await getProducts(searchParams)

  return (
    <div className="container py-8">
      <ProductFilters categories={Object.values(Category)} />
      <ProductGrid products={products} />
    </div>
  )
}

