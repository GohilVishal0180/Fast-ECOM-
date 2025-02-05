import Image from "next/image"
import Link from "next/link"

import { formatPrice } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { OrderStatus } from "@/components/order-status"

interface OrderDetailsProps {
  order: {
    id: string
    status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED"
    shippingAddress: string
    paymentStatus: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"
    paymentMethod: "COD" | "ONLINE"
    orderItems: {
      id: string
      quantity: number
      price: number
      product: {
        id: string
        name: string
        images: string[]
        seller: {
          businessName: string
          verified: boolean
        }
      }
    }[]
  }
}

export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="mt-6">
      <OrderStatus status={order.status} />

      <div className="mt-6">
        <div className="flow-root">
          <ul className="-my-6 divide-y">
            {order.orderItems.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="flex-shrink-0">
                  <Link href={`/products/${item.product.id}`}>
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
                        <Link href={`/products/${item.product.id}`}>{item.product.name}</Link>
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

      <Separator className="my-6" />

      <div className="space-y-4">
        <div>
          <div className="text-sm font-medium">डिलीवरी का पता</div>
          <div className="mt-1 text-sm text-muted-foreground whitespace-pre-line">{order.shippingAddress}</div>
        </div>

        <div>
          <div className="text-sm font-medium">भुगतान की जानकारी</div>
          <div className="mt-1">
            <div className="text-sm text-muted-foreground">
              भुगतान का तरीका: {order.paymentMethod === "COD" ? "कैश ऑन डिलीवरी" : "ऑनलाइन"}
            </div>
            <div className="text-sm text-muted-foreground">
              भुगतान की स्थिति: {order.paymentStatus === "COMPLETED" && "पूर्ण"}
              {order.paymentStatus === "PENDING" && "लंबित"}
              {order.paymentStatus === "FAILED" && "विफल"}
              {order.paymentStatus === "REFUNDED" && "वापस किया गया"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

