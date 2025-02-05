export function getDevURL() {
  const url = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  return url.endsWith("/") ? url.slice(0, -1) : url
}

export function validateDevEnvironment() {
  const requiredEnvVars = [
    "DATABASE_URL",
    "NEXTAUTH_SECRET",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "RAZORPAY_KEY_ID",
    "RAZORPAY_KEY_SECRET",
    "UPLOADTHING_SECRET",
    "UPLOADTHING_APP_ID",
  ]

  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

  if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`)
  }
}

