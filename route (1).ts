import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
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
    const { name, description, price, category, stock, images } = body

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number.parseFloat(price),
        category,
        stock: Number.parseInt(stock),
        images,
        sellerId: seller.id,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[PRODUCTS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

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
    const category = searchParams.get("category")
    const status = searchParams.get("status")

    const products = await prisma.product.findMany({
      where: {
        sellerId: seller.id,
        ...(category ? { category: category as any } : {}),
        ...(status ? { status: status as any } : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.log("[PRODUCTS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

