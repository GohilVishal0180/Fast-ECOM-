import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { OrderDetails } from "@/components/order-details"
import prisma from "@/lib/prisma"

interface OrderPageProps {
  params: {
    orderId: string
  }
}

async function getOrder(orderId: string, userId: string) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
      userId,
    },
    include: {
      orderItems: {
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

  return order
}

export default async function OrderPage({ params }: OrderPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  const order = await getOrder(params.orderId, session.user.id)

  if (!order) {
    redirect("/orders")
  }

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold">ऑर्डर विवरण</h1>
        <div className="mt-6 rounded-lg border bg-white p-6">
          <OrderDetails order={order} />
        </div>
      </div>
    </div>
  )
}

