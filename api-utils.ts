import { NextResponse } from "next/server"
import { ZodError } from "zod"

export function handleError(error: unknown) {
  console.error(error)

  if (error instanceof ZodError) {
    return new NextResponse(JSON.stringify({ error: error.errors[0].message }), {
      status: 400,
    })
  }

  if (error instanceof Error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 400,
    })
  }

  return new NextResponse(JSON.stringify({ error: "Something went wrong! Please try again later." }), { status: 500 })
}

