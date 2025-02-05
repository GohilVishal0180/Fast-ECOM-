"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      setLoading(true)

      const formData = new FormData(event.currentTarget)
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      })

      if (response?.error) {
        toast.error("Invalid credentials")
        return
      }

      router.push("/seller/dashboard")
      router.refresh()
      toast.success("Successfully logged in")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <Image src="/placeholder.svg" alt="Logo" width={48} height={48} className="mx-auto" />
            </Link>
            <h2 className="mt-6 text-3xl font-bold">विक्रेता लॉगिन</h2>
            <p className="mt-2 text-sm text-muted-foreground">अपने अकाउंट में लॉगिन करें</p>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
              <div className="space-y-2">
                <Label htmlFor="email">ईमेल</Label>
                <Input id="email" name="email" type="email" placeholder="आपका ईमेल" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">पासवर्ड</Label>
                <Input id="password" name="password" type="password" placeholder="आपका पासवर्ड" required />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link href="/seller/forgot-password" className="text-blue-600 hover:text-blue-500">
                    पासवर्ड भूल गए?
                  </Link>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "लॉगिन हो रहा है..." : "लॉगिन करें"}
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            अकाउंट नहीं है?{" "}
            <Link href="/seller/register" className="text-blue-600 hover:text-blue-500">
              रजिस्टर करें
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

