"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  addressId: z.string().optional(),
  name: z.string().min(2, "नाम कम से कम 2 अक्षर का होना चाहिए"),
  phone: z.string().min(10, "फोन नंबर 10 अंकों का होना चाहिए"),
  address: z.string().min(5, "पता कम से कम 5 अक्षर का होना चाहिए"),
  city: z.string().min(2, "शहर कम से कम 2 अक्षर का होना चाहिए"),
  state: z.string().min(2, "राज्य कम से कम 2 अक्षर का होना चाहिए"),
  pinCode: z.string().min(6, "पिन कोड 6 अंकों का होना चाहिए"),
  paymentMethod: z.enum(["ONLINE", "COD"]),
})

interface CheckoutFormProps {
  addresses: {
    id: string
    name: string
    phone: string
    address: string
    city: string
    state: string
    pinCode: string
  }[]
}

export function CheckoutForm({ addresses }: CheckoutFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: "ONLINE",
    },
  })

  const onAddressSelect = (addressId: string) => {
    const address = addresses.find((a) => a.id === addressId)
    if (address) {
      form.reset({
        ...address,
        addressId,
        paymentMethod: form.getValues("paymentMethod"),
      })
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      if (values.paymentMethod === "ONLINE") {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.razorpayOrder.amount,
          currency: "INR",
          name: "Digital Market",
          description: "Product Purchase",
          order_id: data.razorpayOrder.id,
          handler: async (response: any) => {
            try {
              await fetch("/api/payment/verify", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  orderId: data.order.id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              })

              router.push(`/order-success/${data.order.id}`)
            } catch (error) {
              toast.error("भुगतान विफल")
            }
          },
          prefill: {
            name: values.name,
            contact: values.phone,
          },
        }

        const razorpay = new (window as any).Razorpay(options)
        razorpay.open()
      } else {
        router.push(`/order-success/${data.order.id}`)
      }
    } catch (error: any) {
      toast.error(error.message || "कुछ गलत हो गया")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {addresses.length > 0 && (
          <div className="space-y-4">
            <FormLabel>सहेजे गए पते</FormLabel>
            <Select onValueChange={onAddressSelect}>
              <SelectTrigger>
                <SelectValue placeholder="पता चुनें" />
              </SelectTrigger>
              <SelectContent>
                {addresses.map((address) => (
                  <SelectItem key={address.id} value={address.id}>
                    {address.name} - {address.address}, {address.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>नाम</FormLabel>
                <FormControl>
                  <Input placeholder="आपका नाम" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>फोन नंबर</FormLabel>
                <FormControl>
                  <Input placeholder="आपका फोन नंबर" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>पता</FormLabel>
                <FormControl>
                  <Textarea placeholder="आपका पूरा पता" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>शहर</FormLabel>
                  <FormControl>
                    <Input placeholder="शहर" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>राज्य</FormLabel>
                  <FormControl>
                    <Input placeholder="राज्य" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pinCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>पिन कोड</FormLabel>
                  <FormControl>
                    <Input placeholder="पिन कोड" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>भुगतान का तरीका</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="ONLINE" />
                    </FormControl>
                    <FormLabel className="font-normal">ऑनलाइन भुगतान (कार्ड/UPI/वॉलेट)</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="COD" />
                    </FormControl>
                    <FormLabel className="font-normal">कैश ऑन डिलीवरी</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "प्रोसेसिंग..." : "ऑर्डर करें"}
        </Button>
      </form>
    </Form>
  )
}

