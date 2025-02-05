import { NextResponse } from "next/server"

// Mock orders data
const orders = [
  {
    id: "ORD001",
    status: "DELIVERED",
    createdAt: "2024-01-15",
    orderItems: [
      {
        quantity: 1,
        price: 24999,
        product: {
          name: "स्मार्टफोन प्रो मैक्स",
          images: ["/placeholder.svg"],
          seller: {
            businessName: "इलेक्ट्रॉनिक्स हब",
            verified: true,
          },
        },
      },
    ],
  },
  {
    id: "ORD002",
    status: "SHIPPED",
    createdAt: "2024-02-01",
    orderItems: [
      {
        quantity: 2,
        price: 1499,
        product: {
          name: "वायरलेस ईयरबड्स",
          images: ["/placeholder.svg"],
          seller: {
            businessName: "साउंड वर्ल्ड",
            verified: true,
          },
        },
      },
    ],
  },
]

export async function GET(req: Request) {
  try {
    // Add artificial delay to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ orders })
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}

