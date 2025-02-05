"use client"

import { useState } from "react"
import {
  BarChart,
  Package,
  ShoppingCart,
  Users,
  Plus,
  IndianRupee,
  Package2,
  Bell,
  Settings,
  ChevronDown,
  Filter,
  Download,
  ArrowUpDown,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/seller/dashboard" className="flex items-center gap-2 font-bold">
            <Package2 className="h-6 w-6" />
            <span>विक्रेता पैनल</span>
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("overview")}
          >
            <BarChart className="mr-2 h-4 w-4" />
            डैशबोर्ड
          </Button>
          <Button
            variant={activeTab === "products" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("products")}
          >
            <Package className="mr-2 h-4 w-4" />
            प्रोडक्ट्स
          </Button>
          <Button
            variant={activeTab === "orders" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            ऑर्डर्स
          </Button>
          <Button
            variant={activeTab === "customers" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("customers")}
          >
            <Users className="mr-2 h-4 w-4" />
            ग्राहक
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <header className="flex h-16 items-center border-b bg-white px-6">
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Image src="/placeholder.svg" alt="Seller Avatar" width={32} height={32} className="rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>प्रोफ़ाइल</DropdownMenuItem>
                <DropdownMenuItem>सेटिंग्स</DropdownMenuItem>
                <DropdownMenuItem>लॉग आउट</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">कुल बिक्री</CardTitle>
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% पिछले महीने से</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">कुल ऑर्डर</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">+201 पिछले महीने से</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">कुल प्रोडक्ट्स</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">128</div>
                    <p className="text-xs text-muted-foreground">+18 पिछले महीने से</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">आज के ऑर्डर्स</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-xs text-muted-foreground">+23% कल से</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">एक्टिव प्रोडक्ट्स</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">+5 आज जोड़े गए</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">रिटर्न रेट</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2.4%</div>
                    <p className="text-xs text-muted-foreground">-0.5% पिछले महीने से</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <CardTitle>हाल के ऑर्डर्स</CardTitle>
                  <Button variant="outline" size="sm">
                    सभी देखें
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ऑर्डर ID</TableHead>
                        <TableHead>प्रोडक्ट</TableHead>
                        <TableHead>कस्टमर</TableHead>
                        <TableHead>कीमत</TableHead>
                        <TableHead>स्टेटस</TableHead>
                        <TableHead>एक्शन</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[1, 2, 3].map((order) => (
                        <TableRow key={order}>
                          <TableCell>#ORD-{order}234</TableCell>
                          <TableCell>स्मार्टफोन प्रो मैक्स</TableCell>
                          <TableCell>राहुल शर्मा</TableCell>
                          <TableCell>₹24,999</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              शिप किया गया
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              विवरण देखें
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Performance Charts */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>बिक्री का ट्रेंड</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Add Chart Component Here */}
                    <div className="h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">बिक्री चार्ट</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>टॉप कैटेगरी</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Add Chart Component Here */}
                    <div className="h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">कैटेगरी चार्ट</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">प्रोडक्ट्स</h2>
                  <p className="text-muted-foreground">अपने सभी प्रोडक्ट्स को यहाँ मैनेज करें</p>
                </div>
                <Link href="/seller/products/add">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    नया प्रोडक्ट
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 items-center gap-4">
                  <Input placeholder="प्रोडक्ट खोजें..." className="max-w-xs" />
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="स्टेटस फ़िल्टर" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">सभी प्रोडक्ट्स</SelectItem>
                      <SelectItem value="active">एक्टिव</SelectItem>
                      <SelectItem value="inactive">इनएक्टिव</SelectItem>
                      <SelectItem value="outofstock">आउट ऑफ स्टॉक</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    एक्सपोर्ट
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>प्रोडक्ट</TableHead>
                        <TableHead>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                            कीमत
                            <ArrowUpDown className="h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>स्टॉक</TableHead>
                        <TableHead>कैटेगरी</TableHead>
                        <TableHead>स्टेटस</TableHead>
                        <TableHead>एक्शन</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[1, 2, 3, 4, 5].map((product) => (
                        <TableRow key={product}>
                          <TableCell className="flex items-center gap-3">
                            <Image src="/placeholder.svg" alt="Product" width={40} height={40} className="rounded-lg" />
                            <div>
                              <div className="font-medium">स्मार्टफोन प्रो मैक्स</div>
                              <div className="text-sm text-muted-foreground">SKU: PRD-{product}234</div>
                            </div>
                          </TableCell>
                          <TableCell>₹24,999</TableCell>
                          <TableCell>45</TableCell>
                          <TableCell>इलेक्ट्रॉनिक्स</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              एक्टिव
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              एडिट
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">ऑर्डर्स</h2>
                <p className="text-muted-foreground">सभी ऑर्डर्स को यहाँ मैनेज करें</p>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ऑर्डर ID</TableHead>
                        <TableHead>ग्राहक</TableHead>
                        <TableHead>प्रोडक्ट</TableHead>
                        <TableHead>कीमत</TableHead>
                        <TableHead>स्थिति</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>#4532</TableCell>
                        <TableCell>राहुल शर्मा</TableCell>
                        <TableCell>स्मार्टफोन एक्स</TableCell>
                        <TableCell>₹15,999</TableCell>
                        <TableCell>शिप किया गया</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "customers" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">ग्राहक</h2>
                <p className="text-muted-foreground">अपने सभी ग्राहकों को यहाँ देखें</p>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>नाम</TableHead>
                        <TableHead>ईमेल</TableHead>
                        <TableHead>कुल ऑर्डर्स</TableHead>
                        <TableHead>कुल खर्च</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>राहुल शर्मा</TableCell>
                        <TableCell>rahul@example.com</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>₹75,999</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

