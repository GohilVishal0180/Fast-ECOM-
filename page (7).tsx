import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { CheckoutForm } from "@/components/checkout-form"
import { OrderSummary } from "@/components/order-summary"
import prisma from "@/lib/prisma"

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        include: {
          product: {
            include: {
              seller: {
                select: {
                  businessName: true,
                  verified: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!cart?.items.length) {
    redirect("/cart")
  }

  const addresses = await prisma.address.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">चेकआउट</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CheckoutForm addresses={addresses} />
        </div>
        <div className="lg:col-span-4">
          <OrderSummary items={cart.items} />
        </div>
      </div>
    </div>
  )
}

