import { NextResponse } from "next/server"
import { prisma } from "@/prisma"

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
