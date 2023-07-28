import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma"
import { ParticipantInGroup } from "@/shared/types"

type GetSelectedParticipantsInput = {
  params: {
    event: string
  }
}

export async function GET(
  _: unknown,
  { params }: GetSelectedParticipantsInput,
) {
  const users = await prisma.user.findMany({
    include: {
      play: {
        select: {
          wannaPlay: true,
          gonnaPlay: true,
          winner: true,
          groupId: true,
        },
        where: {
          event: {
            slug: params.event,
          },
        },
        orderBy: {
          groupId: {
            sort: "asc",
          },
        },
      },
    },

    where: {
      play: {
        some: {
          gonnaPlay: true,
        },
      },
    },
  })

  const result: ParticipantInGroup[] = users.map((user) => {
    const groupId = user.play[0].groupId ?? -1
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      github: user.github,
      wannaPlay: user.play[0].wannaPlay,
      gonnaPlay: user.play[0].gonnaPlay,
      winner: user.play[0].winner,
      groupId,
    }
  })

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
  let group = 1
  let usersInGroup = 0

  const updateUsers = body.map((id) => {
    if (usersInGroup === 4) {
      usersInGroup = 0
      group++
    }

    usersInGroup++

    return prisma.play.update({
      where: {
        userId_eventSlug: {
          eventSlug: event,
          userId: id,
        },
      },
      data: {
        gonnaPlay: true,
        groupId: group,
      },
    })
  })

  await prisma.$transaction([
    prisma.play.updateMany({
      where: {
        eventSlug: event,
        gonnaPlay: true,
      },
      data: {
        gonnaPlay: false,
        groupId: null,
        winner: false,
      },
    }),

    ...updateUsers,
  ])

  return new NextResponse()
}
