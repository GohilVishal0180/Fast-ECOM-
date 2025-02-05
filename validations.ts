import * as z from "zod"

export const loginSchema = z.object({
  email: z.string().email("सही ईमेल पता दर्ज करें"),
  password: z.string().min(6, "पासवर्ड कम से कम 6 अक्षर का होना चाहिए"),
})

export const registerSchema = z.object({
  name: z.string().min(2, "नाम कम से कम 2 अक्षर का होना चाहिए"),
  email: z.string().email("सही ईमेल पता दर्ज करें"),
  password: z.string().min(6, "पासवर्ड कम से कम 6 अक्षर का होना चाहिए"),
})

export const productSchema = z.object({
  name: z.string().min(2, "नाम कम से कम 2 अक्षर का होना चाहिए"),
  description: z.string().min(10, "विवरण कम से कम 10 अक्षर का होना चाहिए"),
  price: z.number().min(0, "कीमत 0 से अधिक होनी चाहिए"),
  category: z.enum(["ELECTRONICS", "FASHION", "HOME", "BEAUTY", "BOOKS", "SPORTS", "TOYS"]),
  stock: z.number().min(0, "स्टॉक 0 से अधिक होना चाहिए"),
  images: z.array(z.string()).min(1, "कम से कम एक फोटो अपलोड करें"),
})

export const addressSchema = z.object({
  name: z.string().min(2, "नाम कम से कम 2 अक्षर का होना चाहिए"),
  phone: z.string().min(10, "फोन नंबर 10 अंक का होना चाहिए"),
  address: z.string().min(10, "पता कम से कम 10 अक्षर का होना चाहिए"),
  city: z.string().min(2, "शहर कम से कम 2 अक्षर का होना चाहिए"),
  state: z.string().min(2, "राज्य कम से कम 2 अक्षर का होना चाहिए"),
  pinCode: z.string().min(6, "पिन कोड 6 अंक का होना चाहिए"),
})

