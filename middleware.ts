import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Security headers
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
]

export async function middleware(request: NextRequest) {
  // Check if the path requires authentication
  const requiresAuth = ["/checkout", "/orders", "/profile", "/seller/dashboard", "/admin"].some((path) =>
    request.nextUrl.pathname.startsWith(path),
  )

  if (requiresAuth) {
    const token = await getToken({ req: request })

    if (!token) {
      const url = new URL(`/login`, request.url)
      url.searchParams.set("callbackUrl", request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    // Check seller routes
    if (request.nextUrl.pathname.startsWith("/seller") && token.role !== "SELLER" && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Check admin routes
    if (request.nextUrl.pathname.startsWith("/admin") && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // Apply security headers
  const response = NextResponse.next()
  securityHeaders.forEach((header) => {
    response.headers.set(header.key, header.value)
  })

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
}

