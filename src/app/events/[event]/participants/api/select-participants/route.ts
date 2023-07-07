import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma"

type GetSelectedParticipantsInput = {
  params: {
    event: string
  }
}

export async function GET(_: unknown, { params }: GetSelectedParticipantsInput) {
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

    where: {
      play: {
        every: {
          gonnaPlay: true,
          wannaPlay: true,
        }
      }
    }
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

type SelectParticipantsInput = {
  params: {
    event: string
  }
}

export async function POST(
  request: NextRequest,
  { params }: SelectParticipantsInput,
) {
  const { event } = params
  // TODO: Validar o body com zod
  const body: string[] = await request.json()

  await prisma.$transaction([
    prisma.play.updateMany({
      where: {
        eventSlug: event,
        gonnaPlay: true,
      },
      data: {
        gonnaPlay: false,
      },
    }),

    prisma.play.updateMany({
      where: {
        userId: {
          in: body,
        },
        eventSlug: event,
      },
      data: {
        gonnaPlay: true,
      },
    }),
  ])

  return new NextResponse()
}


