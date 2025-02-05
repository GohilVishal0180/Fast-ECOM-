import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"
import { ProductCard } from "@/components/ui/product-card"

const featuredProducts = [
  {
    id: "1",
    name: "प्रीमियम स्मार्टफोन",
    description: "शानदार कैमरा और लंबी बैटरी लाइफ के साथ",
    price: 29999,
    originalPrice: 34999,
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 1234,
    seller: {
      name: "टेक वर्ल्ड",
      verified: true,
    },
    discount: 15,
    freeDelivery: true,
  },
  {
    id: "2",
    name: "वायरलेस ईयरबड्स",
    description: "बेहतरीन साउंड क्वालिटी और नॉइज कैंसलेशन",
    price: 2499,
    originalPrice: 3999,
    image: "/placeholder.svg",
    rating: 4.3,
    reviews: 856,
    seller: {
      name: "म्यूजिक स्टोर",
      verified: true,
    },
    discount: 38,
    freeDelivery: true,
  },
  {
    id: "3",
    name: "स्मार्ट वॉच",
    description: "फिटनेस ट्रैकिंग और हार्ट रेट मॉनिटरिंग",
    price: 4999,
    originalPrice: 6999,
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 567,
    seller: {
      name: "गैजेट हब",
      verified: true,
    },
    discount: 29,
    freeDelivery: true,
  },
  {
    id: "4",
    name: "गेमिंग लैपटॉप",
    description: "पावरफुल प्रोसेसर और RTX ग्राफिक्स",
    price: 89999,
    originalPrice: 99999,
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 234,
    seller: {
      name: "गेमिंग वर्ल्ड",
      verified: true,
    },
    discount: 10,
    freeDelivery: true,
  },
]

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategorySection />

      <section className="bg-gray-50 py-12">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">फीचर्ड प्रोडक्ट्स</h2>
            <p className="text-muted-foreground">हमारे बेस्टसेलर प्रोडक्ट्स देखें</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

