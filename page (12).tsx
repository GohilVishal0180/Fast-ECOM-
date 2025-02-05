import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { CartItems } from "@/components/cart-items"
import { CartSummary } from "@/components/cart-summary"
import prisma from "@/lib/prisma"

export default async function CartPage() {
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
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">आपका कार्ट खाली है</h1>
          <p className="mt-2 text-muted-foreground">कुछ प्रोडक्ट्स जोड़ें और शॉपिंग का आनंद लें</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">शॉपिंग कार्ट</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItems items={cart.items} />
        </div>
        <div className="lg:col-span-4">
          <CartSummary items={cart.items} />
        </div>
      </div>
    </div>
  )
}

