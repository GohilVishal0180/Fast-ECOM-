import { NextResponse } from "next/server"
import crypto from "crypto"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    shasum.update(JSON.stringify(body))
    const digest = shasum.digest("hex")

    if (digest !== req.headers.get("x-razorpay-signature")) {
      return new NextResponse("Invalid signature", { status: 400 })
    }

    const { payload } = body
    const { payment } = payload.payment.entity

    // Update order status
    await prisma.order.update({
      where: { id: payment.receipt },
      data: {
        paymentStatus: "COMPLETED",
        status: "CONFIRMED",
      },
    })

    return NextResponse.json({ received: true })
  } catch (error) {
    console.log("[WEBHOOK_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

