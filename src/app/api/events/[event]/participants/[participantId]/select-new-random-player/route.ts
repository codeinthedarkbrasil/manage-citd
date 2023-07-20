import { NextRequest, NextResponse } from "next/server"
import { getRandomInteger } from "@/lib"
import { prisma } from "@/prisma"

type SelectNewRandomPlayerInput = {
  params: {
    event: string
    participantId: string
  }
}
export async function POST(
  request: NextRequest,
  { params }: SelectNewRandomPlayerInput,
) {
  const { participantId, event } = params
  // TODO: Validar com Zod
  const { groupId }: { groupId: number } = await request.json()

  return prisma.$transaction(async (prisma) => {
    const usersThatWannaPlay = await prisma.user.findMany({
      select: {
        id: true,
      },
      where: {
        play: {
          every: {
            wannaPlay: true,
            gonnaPlay: false,
          },
        },
      },
    })

    if (usersThatWannaPlay.length === 0) {
      return NextResponse.json(
        {
          message:
            "Selecione mais de 16 pessoas para participar antes de tentar trocar alguém.",
        },
        {
          status: 400,
        },
      )
    }

    const rnd = getRandomInteger(usersThatWannaPlay.length - 1)
    const randomUserId = usersThatWannaPlay[rnd].id

    await prisma.play.update({
      where: {
        userId_eventSlug: {
          userId: participantId,
          eventSlug: event,
        },
      },
      data: {
        wannaPlay: false,
        gonnaPlay: false,
        groupId: null,
      },
    })

    await prisma.play.update({
      where: {
        userId_eventSlug: {
          userId: randomUserId,
          eventSlug: event,
        },
      },
      data: {
        groupId,
        gonnaPlay: true,
      },
    })

    return NextResponse.json({
      status: 204,
    })
  })
}
