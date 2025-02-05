import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const sort = searchParams.get("sort")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const query = searchParams.get("query")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    const products = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
        ...(category ? { category: category as any } : {}),
        ...(minPrice ? { price: { gte: Number.parseFloat(minPrice) } } : {}),
        ...(maxPrice ? { price: { lte: Number.parseFloat(maxPrice) } } : {}),
        ...(query
          ? {
              OR: [
                { name: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: {
        seller: {
          select: {
            businessName: true,
            verified: true,
          },
        },
      },
      orderBy: {
        ...(sort === "price_asc"
          ? { price: "asc" }
          : sort === "price_desc"
            ? { price: "desc" }
            : sort === "latest"
              ? { createdAt: "desc" }
              : { createdAt: "desc" }),
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.product.count({
      where: {
        status: "ACTIVE",
        ...(category ? { category: category as any } : {}),
        ...(minPrice ? { price: { gte: Number.parseFloat(minPrice) } } : {}),
        ...(maxPrice ? { price: { lte: Number.parseFloat(maxPrice) } } : {}),
        ...(query
          ? {
              OR: [
                { name: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
              ],
            }
          : {}),
      },
    })

    return NextResponse.json({
      products,
      total,
      pages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.log("[PRODUCTS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

