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

    // Get total sales
    const totalSales = await prisma.order.aggregate({
      where: {
        sellerId: seller.id,
        status: "DELIVERED",
      },
      _sum: {
        totalAmount: true,
      },
    })

    // Get total orders
    const totalOrders = await prisma.order.count({
      where: {
        sellerId: seller.id,
      },
    })

    // Get total products
    const totalProducts = await prisma.product.count({
      where: {
        sellerId: seller.id,
      },
    })

    // Get sales by category
    const salesByCategory = await prisma.orderItem.groupBy({
      by: ["product.category"],
      where: {
        order: {
          sellerId: seller.id,
          status: "DELIVERED",
        },
      },
      _sum: {
        price: true,
      },
    })

    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      where: {
        sellerId: seller.id,
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
      take: 5,
    })

    return NextResponse.json({
      totalSales: totalSales._sum.totalAmount || 0,
      totalOrders,
      totalProducts,
      salesByCategory,
      recentOrders,
    })
  } catch (error) {
    console.log("[ANALYTICS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

