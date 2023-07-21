import { prisma } from "@/prisma"
import { NextResponse } from "next/server"

type RemoveParticipantInput = {
  params: {
    participantId: string
    event: string
  }
}

export async function DELETE(_: unknown, { params }: RemoveParticipantInput) {
  const { participantId, event } = params

  await prisma.play.delete({
    where: {
      userId_eventSlug: {
        userId: participantId,
        eventSlug: event,
      },
    },
  })

  return new NextResponse()
}
