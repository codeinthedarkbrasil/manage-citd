import { getQueryParams } from "@/lib/utils"
import { prisma, Prisma } from "@/prisma"
import { NextResponse } from "next/server"

type GetParticipantsInput = {
  params: {
    event: string
  }
}

export async function GET(request: Request, { params }: GetParticipantsInput) {

  const queryParams = getQueryParams(request)

  const search = queryParams.get("search") ?? ''

  const where = buildSearchStatement(search)
  const users = await prisma.user.findMany({
    where,
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

function buildSearchStatement(search: string): Prisma.UserWhereInput {
  const searchStatement: Prisma.UserWhereInput = {
  }

  if (search) {
    searchStatement.OR = [
      {
        name: {
          contains: search,
        },
      },
      {
        email: {
          contains: search,
        },
      },
      {
        github: {
          contains: search,
        },
      },
    ]
  }
  return searchStatement
}

export async function POST(_request: Request) { }
