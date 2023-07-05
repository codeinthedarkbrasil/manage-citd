import { prisma } from "@/prisma"
import { NextResponse } from "next/server"

type GetParticipantsInput = {
  params: {
    event: string
  }
}

export async function GET(_: unknown, { params }: GetParticipantsInput) {
  const users = await prisma.user.findMany({
    include: {
      play: {
        select: {
          wannaPlay: true,
          gonnaPlay: true,
        },
        where: {
          event: {
            slug: params.event,
          },
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
  }))

  return NextResponse.json(result)
}

export async function POST(_request: Request) {}
