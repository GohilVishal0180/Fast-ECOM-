import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Digital Market - Seller Dashboard",
  description: "Sell your products on Digital Market and reach millions of customers",
}

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

