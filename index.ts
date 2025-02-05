export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: Category
  stock: number
  sellerId: string
  status: ProductStatus
  createdAt: Date
  updatedAt: Date
  seller: {
    businessName: string
    verified: boolean
  }
}

export interface CartItem {
  id: string
  quantity: number
  product: Product
}

export interface Order {
  id: string
  status: OrderStatus
  createdAt: Date
  orderItems: OrderItem[]
  shippingAddress: string
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod
}

export interface OrderItem {
  id: string
  quantity: number
  price: number
  product: Product
}

export type Category = "ELECTRONICS" | "FASHION" | "HOME" | "BEAUTY" | "BOOKS" | "SPORTS" | "TOYS"
export type ProductStatus = "DRAFT" | "ACTIVE" | "INACTIVE"
export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED"
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"
export type PaymentMethod = "COD" | "ONLINE"

