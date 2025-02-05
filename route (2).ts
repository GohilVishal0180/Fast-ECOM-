import { hash } from "bcryptjs"
import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      email,
      password,
      name,
      businessName,
      businessType,
      gstNumber,
      panNumber,
      address,
      city,
      state,
      pinCode,
      accountHolder,
      accountNumber,
      ifscCode,
      bankName,
      bankBranch,
    } = body

    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 })
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "SELLER",
      },
    })

    const seller = await prisma.seller.create({
      data: {
        userId: user.id,
        businessName,
        businessType,
        gstNumber,
        panNumber,
        address,
        city,
        state,
        pinCode,
        accountHolder,
        accountNumber,
        ifscCode,
        bankName,
        bankBranch,
      },
    })

    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        seller: {
          id: seller.id,
          businessName: seller.businessName,
          status: seller.status,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.log("[SELLER_REGISTER]", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}

