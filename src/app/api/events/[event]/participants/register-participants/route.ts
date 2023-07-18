import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

interface RegisterParticipantParams {
  params: {
    event: string
  }
}

export async function POST(
  request: NextRequest,
  { params }: RegisterParticipantParams,
) {
  const { event } = params

  const { name, email, github } = await request.json()

  const participant = await prisma.user.create({
    data: {
      name,
      email,
      github,
      play: {
        create: {
          eventSlug: event,
        },
      },
    },
  })

  return NextResponse.json({
    data: participant,
    status: 201,
  })
}
