import { prisma } from "@/prisma"
import { NextResponse } from "next/server"
import { Participant } from "@/shared/types"

type GetParticipantsInput = {
  params: {
    event: string
  }
}

export async function GET(
  _: unknown,
  { params }: GetParticipantsInput,
): Promise<NextResponse<Participant[]>> {
  const users = await prisma.user.findMany({
    where: {
      play: {
        some: {
          eventSlug: params.event,
        },
      },
    },
    include: {
      play: {
        where: {
          eventSlug: params.event,
        },
      },
    },
  })

  const result = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    github: user.github,
    wannaPlay: user.play[0].wannaPlay,
    gonnaPlay: user.play[0].gonnaPlay,
    winner: user.play[0].winner,
    groupId: user.play[0].groupId,
  }))

  return NextResponse.json(result)
}

export async function POST(_request: Request) {}
