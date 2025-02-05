import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const seller = await prisma.seller.findFirst({
      where: {
        userId: session.user.id,
      },
    })

    if (!seller) {
      return new NextResponse("Seller not found", { status: 404 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")

    const orders = await prisma.order.findMany({
      where: {
        sellerId: seller.id,
        ...(status ? { status: status as any } : {}),
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.log("[ORDERS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const seller = await prisma.seller.findFirst({
      where: {
        userId: session.user.id,
      },
    })

    if (!seller) {
      return new NextResponse("Seller not found", { status: 404 })
    }

    const body = await req.json()
    const { orderId, status } = body

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        sellerId: seller.id,
      },
    })

    if (!order) {
      return new NextResponse("Order not found", { status: 404 })
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.log("[ORDERS_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

