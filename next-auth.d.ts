import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "USER" | "SELLER" | "ADMIN"
    } & DefaultSession["user"]
  }
}

