"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingCart, User, Search, Package2, Heart } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const routes = [
    {
      href: "/",
      label: "होम",
      active: pathname === "/",
    },
    {
      href: "/categories",
      label: "श्रेणियां",
      active: pathname === "/categories",
    },
    {
      href: "/deals",
      label: "डील्स",
      active: pathname === "/deals",
    },
    {
      href: "/new-arrivals",
      label: "नए प्रोडक्ट्स",
      active: pathname === "/new-arrivals",
    },
  ]

  return (
    <header className="border-b">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-blue-600">
            <Package2 className="h-6 w-6" />
            Digital Market
          </Link>
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                asChild
                variant="ghost"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  route.active ? "text-black" : "text-muted-foreground",
                )}
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
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>मेरा अकाउंट</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/profile")}>प्रोफ़ाइल</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/orders")}>मेरे ऑर्डर</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/wishlist")}>विशलिस्ट</DropdownMenuItem>
                  {session.user.role === "SELLER" && (
                    <DropdownMenuItem onClick={() => router.push("/seller/dashboard")}>विक्रेता डैशबोर्ड</DropdownMenuItem>
                  )}
                  {session.user.role === "ADMIN" && (
                    <DropdownMenuItem onClick={() => router.push("/admin")}>एडमिन पैनल</DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>लॉग आउट</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => router.push("/login")} variant="ghost">
                लॉग इन
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

