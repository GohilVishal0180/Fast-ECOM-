import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json([])
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
        status: "ACTIVE",
      },
      include: {
        seller: {
          select: {
            businessName: true,
            verified: true,
          },
        },
      },
      take: 5,
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("[SEARCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

