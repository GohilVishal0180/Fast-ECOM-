"use client"

import * as z from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Package2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const formSchema = z.object({
  email: z.string().email({
    message: "सही ईमेल पता दर्ज करें",
  }),
  password: z.string().min(6, {
    message: "पासवर्ड कम से कम 6 अक्षर का होना चाहिए",
  }),
})

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      })

      if (res?.error) {
        toast.error("अमान्य क्रेडेंशियल्स")
        return
      }

      router.push(callbackUrl)
      router.refresh()
      toast.success("सफलतापूर्वक लॉग इन किया गया")
    } catch (error) {
      toast.error("कुछ गलत हो गया")
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    try {
      setLoading(true)
      await signIn("google", { callbackUrl })
    } catch (error) {
      toast.error("कुछ गलत हो गया")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Link href="/" className="mx-auto">
            <Package2 className="h-10 w-10 text-blue-600" />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">अपने अकाउंट में लॉगिन करें</h1>
          <p className="text-sm text-muted-foreground">अपना ईमेल और पासवर्ड दर्ज करें</p>
        </div>

        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ईमेल</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="aapka@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>पासवर्ड</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "लॉगिन हो रहा है..." : "लॉगिन करें"}
              </Button>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">या जारी रखें</span>
            </div>
          </div>

          <Button variant="outline" type="button" disabled={loading} onClick={loginWithGoogle}>
            Google से जारी रखें
          </Button>
        </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/register" className="hover:text-brand underline underline-offset-4">
            अकाउंट नहीं है? रजिस्टर करें
          </Link>
        </p>
      </div>
    </div>
  )
}

