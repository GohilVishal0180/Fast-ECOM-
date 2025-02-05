import { execSync } from "child_process"
import * as fs from "fs"
import * as path from "path"

function generateRandomString(length: number) {
  return Array.from({ length }, () =>
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(Math.floor(Math.random() * 62)),
  ).join("")
}

async function main() {
  console.log("🚀 Setting up development environment...")

  // Check if .env file exists
  const envPath = path.join(process.cwd(), ".env")
  if (!fs.existsSync(envPath)) {
    console.log("📝 Creating .env file...")
    const envExample = `
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL="postgresql://postgres:password@localhost:5432/digital_market"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="${generateRandomString(32)}"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
RAZORPAY_WEBHOOK_SECRET=""
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""
NEXT_PUBLIC_RAZORPAY_KEY_ID=""
`
    fs.writeFileSync(envPath, envExample.trim())
    console.log("✅ Created .env file")
  }

  // Install dependencies
  console.log("📦 Installing dependencies...")
  execSync("npm install", { stdio: "inherit" })

  // Generate Prisma Client
  console.log("🔄 Generating Prisma Client...")
  execSync("npx prisma generate", { stdio: "inherit" })

  // Push database schema
  console.log("🗃️ Pushing database schema...")
  execSync("npx prisma db push", { stdio: "inherit" })

  console.log(`
✨ Development environment setup complete!

Next steps:
1. Update your .env file with your actual credentials
2. Run 'npm run dev' to start the development server

For deployment:
1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in Vercel
4. Deploy!
`)
}

main().catch((error) => {
  console.error("❌ Error setting up development environment:", error)
  process.exit(1)
})

