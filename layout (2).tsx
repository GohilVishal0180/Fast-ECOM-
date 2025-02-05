import type { Metadata } from "next"
import { setupDevEnvironment } from "@/lib/dev-config"

// Setup development environment
setupDevEnvironment()

export const metadata: Metadata = {
  title: {
    default: "Digital Market - आपकी डिजिटल दुनिया एक जगह",
    template: "%s | Digital Market",
  },
  description: "लाखों प्रोडक्ट्स, बेहतरीन डील्स और फ्री डिलीवरी के साथ। अभी शॉपिंग करें और पाएं विशेष छूट!",
  keywords: ["ecommerce", "shopping", "online shopping", "digital market", "electronics", "fashion"],
  authors: [{ name: "Digital Market" }],
  creator: "Digital Market",
  publisher: "Digital Market",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    type: "website",
    locale: "hi_IN",
    url: "https://your-domain.com",
    title: "Digital Market - आपकी डिजिटल दुनिया एक जगह",
    description: "लाखों प्रोडक्ट्स, बेहतरीन डील्स और फ्री डिलीवरी के साथ। अभी शॉपिंग करें और पाएं विशेष छूट!",
    siteName: "Digital Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Market - आपकी डिजिटल दुनिया एक जगह",
    description: "लाखों प्रोडक्ट्स, बेहतरीन डील्स और फ्री डिलीवरी के साथ। अभी शॉपिंग करें और पाएं विशेष छूट!",
    creator: "@digitalmarket",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}



import './globals.css'