import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price)
}

export const getURL = () => {
  let url = process?.env?.NEXT_PUBLIC_SITE_URL ?? process?.env?.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000/"

  url = url.includes("http") ? url : `https://${url}`
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`

  return url
}

