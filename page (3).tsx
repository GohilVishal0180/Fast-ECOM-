"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

import { createProduct } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function AddProduct() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  async function onSubmit(formData: FormData) {
    try {
      setLoading(true)
      const result = await createProduct(formData)

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success("प्रोडक्ट सफलतापूर्वक जोड़ा गया")
      router.push("/seller/products")
      router.refresh()
    } catch (error) {
      toast.error("कुछ गलत हो गया")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/seller/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">नया प्रोडक्ट जोड़ें</h1>
            <p className="text-muted-foreground">अपने नए प्रोडक्ट की जानकारी भरें</p>
          </div>
        </div>

        <form action={onSubmit} className="space-y-8 rounded-lg border bg-white p-6">
          <div className="space-y-2">
            <Label htmlFor="name">प्रोडक्ट का नाम</Label>
            <Input id="name" name="name" placeholder="प्रोडक्ट का नाम दर्ज करें" required />
          </div>

          <div className="space-y-2">
            <Label>प्रोडक्ट की श्रेणी</Label>
            <Select name="category" required>
              <SelectTrigger>
                <SelectValue placeholder="श्रेणी चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">इलेक्ट्रॉनिक्स</SelectItem>
                <SelectItem value="fashion">फैशन</SelectItem>
                <SelectItem value="home">होम</SelectItem>
                <SelectItem value="beauty">ब्यूटी</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">प्रोडक्ट का विवरण</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="प्रोडक्ट का विस्तृत विवरण दर्ज करें"
              rows={5}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">कीमत (₹)</Label>
              <Input id="price" name="price" type="number" min="0" placeholder="0.00" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">स्टॉक</Label>
              <Input id="stock" name="stock" type="number" min="0" placeholder="0" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>प्रोडक्ट की फोटो</Label>
            <div className="grid gap-4 md:grid-cols-3">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg border bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Product image ${index + 1}`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              ))}
              <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border border-dashed bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">फोटो अपलोड करें</span>
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                  name="images"
                />
              </label>
            </div>
          </div>

          <Button className="w-full" disabled={loading}>
            {loading ? "प्रोडक्ट जोड़ा जा रहा है..." : "प्रोडक्ट जोड़ें"}
          </Button>
        </form>
      </div>
    </div>
  )
}

