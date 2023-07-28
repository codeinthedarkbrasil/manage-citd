import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

type RegisterParticipantParams = {
  params: {
    event: string
  }
}

export async function POST(
  request: NextRequest,
  { params }: RegisterParticipantParams,
) {
  const { event } = params

  // TODO: validar com Zod
  const {
    name,
    email,
    github,
  }: { name: string; email: string; github?: string } = await request.json()

  const participant = await prisma.user.create({
    data: {
      name,
      email,
      github: !!github ? github : undefined,
      play: {
        create: {
          eventSlug: event,
          wannaPlay: true,
        },
      },
    },
  })

  return NextResponse.json({
    data: participant,
    status: 201,
  })
}
