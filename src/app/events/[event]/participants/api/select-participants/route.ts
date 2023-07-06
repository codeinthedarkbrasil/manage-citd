import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma"

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
