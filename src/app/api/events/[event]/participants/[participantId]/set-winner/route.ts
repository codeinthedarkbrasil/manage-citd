import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma"

type SetWinnerInput = {
  params: {
    event: string
    participantId: string
  }
}
export async function POST(request: NextRequest, { params }: SetWinnerInput) {
  const { participantId, event } = params
  // TODO: Validar com Zod
  const { groupId }: { groupId: number } = await request.json()

  await prisma.$transaction([
    prisma.play.updateMany({
      where: {
        eventSlug: event,
        groupId,
        winner: true,
      },
      data: {
        winner: false,
      },
    }),

    prisma.play.update({
      where: {
        userId_eventSlug: {
          userId: participantId,
          eventSlug: event,
        },
      },
      data: {
        winner: true,
      },
    }),
  ])

  return new NextResponse()
}
