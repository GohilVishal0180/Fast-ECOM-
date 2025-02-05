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

    const { productId, quantity } = await req.json()

    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return new NextResponse("Product not found", { status: 404 })
    }

    if (product.stock < quantity) {
      return new NextResponse("Insufficient stock", { status: 400 })
    }

    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: { items: true },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: session.user.id,
        },
        include: { items: true },
      })
    }

    const existingItem = cart.items.find((item) => item.productId === productId)

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log("[CART_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
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

    if (!cart) {
      return NextResponse.json({ items: [] })
    }

    return NextResponse.json(cart)
  } catch (error) {
    console.log("[CART_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const itemId = searchParams.get("itemId")

    if (!itemId) {
      return new NextResponse("Item ID is required", { status: 400 })
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    })

    if (!cartItem || cartItem.cart.userId !== session.user.id) {
      return new NextResponse("Not found", { status: 404 })
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log("[CART_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { itemId, quantity } = await req.json()

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: {
        cart: true,
        product: true,
      },
    })

    if (!cartItem || cartItem.cart.userId !== session.user.id) {
      return new NextResponse("Not found", { status: 404 })
    }

    if (cartItem.product.stock < quantity) {
      return new NextResponse("Insufficient stock", { status: 400 })
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.log("[CART_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

