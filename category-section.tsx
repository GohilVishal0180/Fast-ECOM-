"use client"

import { useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "इलेक्ट्रॉनिक्स",
    image: "/placeholder.svg",
    items: "50,000+ आइटम",
  },
  {
    name: "फैशन",
    image: "/placeholder.svg",
    items: "1,00,000+ आइटम",
  },
  {
    name: "होम",
    image: "/placeholder.svg",
    items: "30,000+ आइटम",
  },
  {
    name: "ब्यूटी",
    image: "/placeholder.svg",
    items: "20,000+ आइटम",
  },
  {
    name: "मोबाइल",
    image: "/placeholder.svg",
    items: "10,000+ आइटम",
  },
  {
    name: "लैपटॉप",
    image: "/placeholder.svg",
    items: "5,000+ आइटम",
  },
]

export function CategorySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative py-12">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">श्रेणियां ब्राउज़ करें</h2>
            <p className="text-muted-foreground">हमारी लोकप्रिय श्रेणियों में से चुनें</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="w-[250px] hover-lift card-hover">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="rounded-t-lg object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.items}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

