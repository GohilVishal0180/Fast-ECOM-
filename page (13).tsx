import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { OrdersList } from "@/components/orders-list"
import prisma from "@/lib/prisma"

interface OrdersPageProps {
  searchParams: {
    status?: string
    page?: string
  }
}

async function getOrders(userId: string, status?: string, page = 1) {
  const itemsPerPage = 10

  const orders = await prisma.order.findMany({
    where: {
      userId,
      ...(status ? { status: status as any } : {}),
    },
    include: {
      orderItems: {
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
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * itemsPerPage,
    take: itemsPerPage,
  })

  const total = await prisma.order.count({
    where: {
      userId,
      ...(status ? { status: status as any } : {}),
    },
  })

  return {
    orders,
    total,
    totalPages: Math.ceil(total / itemsPerPage),
  }
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  const { orders, total, totalPages } = await getOrders(
    session.user.id,
    searchParams.status,
    searchParams.page ? Number.parseInt(searchParams.page) : 1,
  )

  if (!orders.length) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">कोई ऑर्डर नहीं मिला</h1>
          <p className="mt-2 text-muted-foreground">आप अभी तक कोई ऑर्डर नहीं किया है</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">मेरे ऑर्डर</h1>
          <p className="mt-2 text-muted-foreground">कुल {total} ऑर्डर मिले</p>
        </div>
      </div>

      <OrdersList
        orders={orders}
        pageCount={totalPages}
        status={searchParams.status}
        page={searchParams.page ? Number.parseInt(searchParams.page) : 1}
      />
    </div>
  )
}

