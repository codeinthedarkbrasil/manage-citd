import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma"
import { registerEventSchema } from "@/shared/types"

export async function GET() {
  const eventsData = await prisma.event.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      _count: {
        select: {
          play: true,
        },
      },
    },
  })

  const events = eventsData.map((event) => ({
    id: event.id,
    name: event.name,
    slug: event.slug,
    participantsCount: event._count.play,
  }))

  return NextResponse.json(events)
}

export async function POST(request: NextRequest) {
  const registerEventDataFromRequest = await request.json()
  const data = registerEventSchema.parse(registerEventDataFromRequest)
  const newEvent = await prisma.event.create({
    data,
    select: {
      id: true,
      name: true,
      slug: true,
      _count: {
        select: {
          play: true,
        },
      },
    },
  })

  const event = {
    id: newEvent.id,
    name: newEvent.name,
    slug: newEvent.slug,
    participantsCount: newEvent._count.play,
  }

  return NextResponse.json(event)
}
