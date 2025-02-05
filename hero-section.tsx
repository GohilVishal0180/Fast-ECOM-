"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ShoppingBag, Star, Truck } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-blue-100 opacity-50 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-purple-100 opacity-50 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <Badge className="mb-4 w-fit" variant="secondary">
              🎉 नए ऑफर्स हर दिन
            </Badge>
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight lg:text-6xl">
              आपकी <span className="gradient-text">डिजिटल दुनिया</span>
              <br />
              एक जगह
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              लाखों प्रोडक्ट्स, बेहतरीन डील्स और फ्री डिलीवरी के साथ। अभी शॉपिंग करें और पाएं विशेष छूट!
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="button-hover">
                अभी खरीदें
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="button-hover">
                और जानें
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-green-100 p-2 text-green-600">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <span className="text-sm">50 लाख+ प्रोडक्ट्स</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-yellow-100 p-2 text-yellow-600">
                  <Star className="h-4 w-4" />
                </div>
                <span className="text-sm">4.8/5 रेटिंग</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                  <Truck className="h-4 w-4" />
                </div>
                <span className="text-sm">फ्री डिलीवरी</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[600px] w-full">
              <Image src="/placeholder.svg" alt="Hero Image" fill className="object-contain" priority />
            </div>

            {/* Floating cards */}
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 2,
              }}
              className="absolute -right-4 top-20 w-64 rounded-lg bg-white p-4 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100" />
                <div>
                  <div className="text-sm font-medium">नया ऑर्डर मिला!</div>
                  <div className="text-xs text-muted-foreground">अभी 2 मिनट पहले</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 2,
                delay: 1,
              }}
              className="absolute -left-4 bottom-20 w-64 rounded-lg bg-white p-4 shadow-xl"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">₹500 की छूट</div>
                <div className="text-sm text-muted-foreground">पहली खरीद पर</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

