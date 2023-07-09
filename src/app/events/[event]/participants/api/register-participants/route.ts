import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

interface Context {
  params: {
    event: string
  }
}

export async function POST(request: NextRequest, { params }: Context) {
  const { event } = params

  const data = await request.json()

  const participant = await prisma.user.create({
    data: {
      ...data,
      play: {
        create: {
          eventSlug: event,
        },
      },
    },
  })

  return NextResponse.json(participant)
}
