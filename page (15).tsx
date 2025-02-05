"use client"

import { useState, useEffect } from "react"
import { Package2, Search, ShoppingCart, User, Heart } from "lucide-react"
import Link from "next/link"

import { OrdersList } from "@/components/orders-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function DemoPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/demo/orders")
        const data = await response.json()
        setOrders(data.orders)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const routes = [
    {
      href: "/",
      label: "होम",
    },
    {
      href: "/categories",
      label: "श्रेणियां",
    },
    {
      href: "/deals",
      label: "डील्स",
    },
    {
      href: "/new-arrivals",
      label: "नए प्रोडक्ट्स",
    },
  ]

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-blue-600">
              <Package2 className="h-6 w-6" />
              <span>डिजिटल मार्केट</span>
            </Link>
            <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  asChild
                  variant="ghost"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  <Link href={route.href}>{route.label}</Link>
                </Button>
              ))}
            </nav>
            <div className="ml-auto flex items-center space-x-4">
              <form className="hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="प्रोडक्ट खोजें..." className="pl-8 w-[300px]" />
                </div>
              </form>
              <Button variant="ghost" size="icon" className="hidden lg:flex">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-blue-600 text-[10px] font-medium text-white">
                  2
                </span>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">मेरे ऑर्डर</h1>
              <p className="mt-2 text-muted-foreground">कुल {orders.length} ऑर्डर मिले</p>
            </div>
          </div>

          <OrdersList orders={orders} pageCount={1} page={1} />
        </div>
      </main>

      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="font-bold">डिजिटल मार्केट के बारे में</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-zinc-600 hover:text-zinc-900">
                    हमारे बारे में
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-600 hover:text-zinc-900">
                    करियर
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-600 hover:text-zinc-900">
                    प्रेस
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">ग्राहक सेवा</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-zinc-600 hover:text-zinc-900">
                    सहायता केंद्र
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-600 hover:text-zinc-900">
                    वापसी
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-600 hover:text-zinc-900">
                    संपर्क करें
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">नीतियां</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-zinc-600 hover:text-zinc-900">
                    वापसी नीति
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-600 hover:text-zinc-900">
                    उपयोग की शर्तें
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-600 hover:text-zinc-900">
                    गोपनीयता
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">हमसे जुड़ें</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-zinc-600 hover:text-zinc-900">
                    फेसबुक
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-600 hover:text-zinc-900">
                    ट्विटर
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-600 hover:text-zinc-900">
                    इंस्टाग्राम
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-sm text-zinc-600">© 2024 डिजिटल मार्केट. सर्वाधिकार सुरक्षित.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

