"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrderStatus } from "@/components/order-status"
import { formatPrice } from "@/lib/utils"

interface OrdersListProps {
  orders: {
    id: string
    status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED"
    createdAt: Date
    orderItems: {
      quantity: number
      price: number
      product: {
        name: string
        images: string[]
        seller: {
          businessName: string
          verified: boolean
        }
      }
    }[]
  }[]
  pageCount: number
  status?: string
  page: number
}

export function OrdersList({ orders, pageCount, status, page }: OrdersListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("status", value)
    } else {
      params.delete("status")
    }
    params.delete("page")
    router.push(`/orders?${params.toString()}`)
  }

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`/orders?${params.toString()}`)
  }

  return (
    <div className="mt-8 space-y-8">
      <div>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="सभी ऑर्डर" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">सभी ऑर्डर</SelectItem>
            <SelectItem value="PENDING">लंबित</SelectItem>
            <SelectItem value="CONFIRMED">कन्फर्म</SelectItem>
            <SelectItem value="SHIPPED">शिप किया गया</SelectItem>
            <SelectItem value="DELIVERED">डिलीवर किया गया</SelectItem>
            <SelectItem value="CANCELLED">रद्द किया गया</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-8">
        {orders.map((order) => {
          const total = order.orderItems.reduce((acc, item) => {
            return acc + item.price * item.quantity
          }, 0)

          return (
            <div key={order.id} className="rounded-lg border bg-white p-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <div className="text-sm text-muted-foreground">ऑर्डर ID: {order.id}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{formatPrice(total)}</div>
                  <div className="mt-1">
                    <Link href={`/orders/${order.id}`} className="text-sm text-blue-600 hover:text-blue-500">
                      विवरण देखें
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <OrderStatus status={order.status} />
              </div>

              <div className="mt-6">
                <div className="flow-root">
                  <ul className="-my-6 divide-y">
                    {order.orderItems.map((item) => (
                      <li key={item.product.name} className="flex py-6">
                        <div className="flex-shrink-0">
                          <Link href={`/products/${item.product.name}`}>
                            <Image
                              src={item.product.images[0] || "/placeholder.svg"}
                              alt={item.product.name}
                              width={100}
                              height={100}
                              className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                            />
                          </Link>
                        </div>

                        <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                          <div>
                            <div className="flex justify-between">
                              <h4 className="font-medium">
                                <Link href={`/products/${item.product.name}`}>{item.product.name}</Link>
                              </h4>
                              <p className="ml-4 font-medium">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              विक्रेता: {item.product.seller.businessName}
                              {item.product.seller.verified && (
                                <span className="ml-1 inline-block rounded-full bg-blue-500 p-0.5 text-[8px] text-white">
                                  ✓
                                </span>
                              )}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">मात्रा: {item.quantity}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm">
            पेज {page} / {pageCount}
          </div>
          <Button variant="outline" size="icon" onClick={() => onPageChange(page + 1)} disabled={page === pageCount}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

