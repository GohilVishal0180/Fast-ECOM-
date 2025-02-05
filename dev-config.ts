import { validateDevEnvironment } from "./dev-utils"

export function setupDevEnvironment() {
  if (process.env.NODE_ENV === "development") {
    try {
      validateDevEnvironment()
    } catch (error) {
      console.error(`
🚨 Development Environment Error:
${error.message}

Please run 'npm run dev:setup' to set up your development environment.
This will:
1. Create a .env file if it doesn't exist
2. Install dependencies
3. Generate Prisma Client
4. Push database schema

Then update your .env file with your actual credentials.
`)
      process.exit(1)
    }
  }
}

