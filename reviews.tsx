"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface ReviewsProps {
  productId: string
  reviews: {
    id: string
    rating: number
    comment: string
    createdAt: Date
    user: {
      name: string | null
      image: string | null
    }
  }[]
  averageRating: number
}

export function Reviews({ productId, reviews, averageRating }: ReviewsProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)

      if (!session) {
        router.push("/login")
        return
      }

      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment,
        }),
      })

      if (!response.ok) {
        throw new Error()
      }

      setOpen(false)
      router.refresh()
      toast.success("रिव्यू जोड़ा गया")
    } catch (error) {
      toast.error("कुछ गलत हो गया")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-16 lg:mt-20">
      <h2 className="text-lg font-medium">ग्राहक रिव्यू ({reviews.length})</h2>

      <div className="mt-6">
        <div className="flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <Star
                key={rating}
                className={`h-5 w-5 ${
                  rating < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="ml-3 text-sm text-gray-500">{averageRating.toFixed(1)} में से 5</p>
        </div>

        <div className="mt-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>रिव्यू लिखें</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>रिव्यू लिखें</DialogTitle>
                <DialogDescription>अपना अनुभव साझा करें और दूसरों की मदद करें</DialogDescription>
              </DialogHeader>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button key={value} type="button" onClick={() => setRating(value)}>
                        <Star
                          className={`h-8 w-8 ${value <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <Textarea
                  placeholder="अपना रिव्यू लिखें..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  required
                />
                <Button type="submit" disabled={loading}>
                  {loading ? "जमा किया जा रहा है..." : "जमा करें"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-8 flow-root">
          <div className="-my-6 divide-y divide-gray-200">
            {reviews.map((review) => (
              <div key={review.id} className="py-6">
                <div className="flex items-center">
                  {review.user.image ? (
                    <Image
                      src={review.user.image || "/placeholder.svg"}
                      alt={review.user.name || ""}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                  )}
                  <div className="ml-4">
                    <h4 className="text-sm font-bold">{review.user.name}</h4>
                    <div className="mt-1 flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <Star
                          key={rating}
                          className={`h-4 w-4 ${
                            rating < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-500">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

