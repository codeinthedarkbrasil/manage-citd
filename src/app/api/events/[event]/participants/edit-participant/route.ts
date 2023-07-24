import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  // TODO: validar com Zod
  const {
    id,
    name,
    email,
    github,
  }: { id: string; name: string; email: string; github?: string } =
    await request.json()

  const participant = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      github: !!github ? github : undefined,
    },
  })

  return NextResponse.json({
    data: participant,
    status: 201,
  })
}
