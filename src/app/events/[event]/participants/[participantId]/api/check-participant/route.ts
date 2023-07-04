import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma"

type CheckParticipantInput = {
  params: {
    event: string
    participantId: string
  }
}

export async function POST(
  request: NextRequest,
  { params }: CheckParticipantInput,
) {
  const { event, participantId } = params
  // TODO: Validar o body com zod
  const body: { checked: boolean } = await request.json()
  console.log({ body })

  await prisma.play.update({
    where: {
      userId_eventSlug: {
        userId: participantId,
        eventSlug: event,
      },
    },
    data: {
      wannaPlay: body.checked,
    },
  })

  return new NextResponse()
}
