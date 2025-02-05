import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { items, shippingAddress, paymentMethod } = body

    // Validate items and calculate total
    let totalAmount = 0
    const orderItems = []

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      })

      if (!product) {
        return new NextResponse(`Product ${item.productId} not found`, { status: 404 })
      }

      if (product.stock < item.quantity) {
        return new NextResponse(`Insufficient stock for ${product.name}`, { status: 400 })
      }

      totalAmount += product.price * item.quantity
      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      })
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        sellerId: items[0].sellerId, // Assuming single seller order
        totalAmount,
        shippingAddress,
        paymentMethod,
        orderItems: {
          create: orderItems,
        },
      },
    })

    // If online payment, create Razorpay order
    if (paymentMethod === "ONLINE") {
      const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100, // Convert to paise
        currency: "INR",
        receipt: order.id,
      })

      return NextResponse.json({
        order,
        razorpayOrder,
      })
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.log("[CHECKOUT_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

