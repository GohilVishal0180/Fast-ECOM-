import { NextResponse } from "next/server"

export class ApiError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }
}

export function handleApiError(error: unknown) {
  console.error("API Error:", error)

  if (error instanceof ApiError) {
    return new NextResponse(error.message, { status: error.statusCode })
  }

  return new NextResponse("Internal Server Error", { status: 500 })
}

