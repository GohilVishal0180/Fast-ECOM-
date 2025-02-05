import { Package, PackageCheck, PackageOpen, ShoppingCart, XCircle } from "lucide-react"

interface OrderStatusProps {
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED"
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div
          className={`flex flex-col items-center ${
            status === "CANCELLED" ? "text-red-600" : status !== "PENDING" ? "text-green-600" : ""
          }`}
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
              status === "CANCELLED" ? "border-red-600" : status !== "PENDING" ? "border-green-600" : ""
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
          </div>
          <div className="mt-2 text-sm font-medium">ऑर्डर प्राप्त</div>
        </div>

        <div
          className={`flex flex-col items-center ${
            status === "CANCELLED" ? "text-red-600" : status !== "PENDING" ? "text-green-600" : ""
          }`}
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
              status === "CANCELLED"
                ? "border-red-600"
                : status === "CONFIRMED" || status === "SHIPPED" || status === "DELIVERED"
                  ? "border-green-600"
                  : ""
            }`}
          >
            <Package className="h-5 w-5" />
          </div>
          <div className="mt-2 text-sm font-medium">कन्फर्म</div>
        </div>

        <div
          className={`flex flex-col items-center ${
            status === "CANCELLED"
              ? "text-red-600"
              : status === "SHIPPED" || status === "DELIVERED"
                ? "text-green-600"
                : ""
          }`}
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
              status === "CANCELLED"
                ? "border-red-600"
                : status === "SHIPPED" || status === "DELIVERED"
                  ? "border-green-600"
                  : ""
            }`}
          >
            <PackageOpen className="h-5 w-5" />
          </div>
          <div className="mt-2 text-sm font-medium">शिप किया गया</div>
        </div>

        <div
          className={`flex flex-col items-center ${
            status === "CANCELLED" ? "text-red-600" : status === "DELIVERED" ? "text-green-600" : ""
          }`}
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
              status === "CANCELLED" ? "border-red-600" : status === "DELIVERED" ? "border-green-600" : ""
            }`}
          >
            {status === "CANCELLED" ? <XCircle className="h-5 w-5" /> : <PackageCheck className="h-5 w-5" />}
          </div>
          <div className="mt-2 text-sm font-medium">{status === "CANCELLED" ? "रद्द किया गया" : "डिलीवर किया गया"}</div>
        </div>
      </div>

      <div className="relative mt-4">
        <div className="absolute inset-0 flex items-center">
          <div className={`h-0.5 w-full ${status === "CANCELLED" ? "bg-red-600" : "bg-gray-200"}`} />
        </div>
        <div className="relative flex justify-between">
          <div
            className={`h-0.5 ${
              status === "CANCELLED" ? "bg-red-600" : status !== "PENDING" ? "bg-green-600" : "bg-gray-200"
            }`}
            style={{ width: "33%" }}
          />
          <div
            className={`h-0.5 ${
              status === "CANCELLED"
                ? "bg-red-600"
                : status === "SHIPPED" || status === "DELIVERED"
                  ? "bg-green-600"
                  : "bg-gray-200"
            }`}
            style={{ width: "33%" }}
          />
          <div
            className={`h-0.5 ${
              status === "CANCELLED" ? "bg-red-600" : status === "DELIVERED" ? "bg-green-600" : "bg-gray-200"
            }`}
            style={{ width: "33%" }}
          />
        </div>
      </div>
    </div>
  )
}

