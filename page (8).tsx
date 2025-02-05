import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { CheckCircle, Package } from "lucide-react"
import Link from "next/link"

import { authOptions } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { OrderDetails } from "@/components/order-details"
import prisma from "@/lib/prisma"
import { formatPrice } from "@/lib/utils"

interface OrderSuccessPageProps {
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

export default async function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  const order = await getOrder(params.orderId, session.user.id)

  if (!order) {
    redirect("/")
  }

  const total = order.orderItems.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        <h1 className="mt-4 text-3xl font-bold">ऑर्डर सफल!</h1>
        <p className="mt-2 text-lg text-muted-foreground">आपका ऑर्डर सफलतापूर्वक प्लेस हो गया है।</p>
        <div className="mt-4 text-sm text-muted-foreground">ऑर्डर ID: {order.id}</div>
      </div>

      <div className="mt-12 rounded-lg border bg-white px-6 py-8">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <div className="text-sm text-muted-foreground">ऑर्डर की तारीख</div>
            <div className="mt-1">{new Date(order.createdAt).toLocaleDateString()}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">कुल राशि</div>
            <div className="mt-1">{formatPrice(total)}</div>
          </div>
        </div>

        <OrderDetails order={order} />

        <div className="mt-8 space-y-4">
          <div className="rounded-lg bg-blue-50 p-4">
            <div className="flex items-start">
              <Package className="h-5 w-5 text-blue-600" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">डिलीवरी की जानकारी</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>आपका ऑर्डर 2-3 कार्य दिवसों में डिलीवर कर दिया जाएगा।</p>
                  <p className="mt-1">आप अपने ऑर्डर को "मेरे ऑर्डर" सेक्शन में ट्रैक कर सकते हैं।</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button asChild className="flex-1">
              <Link href="/orders">ऑर्डर ट्रैक करें</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/">शॉपिंग जारी रखें</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

