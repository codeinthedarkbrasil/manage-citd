import { NextResponse } from "next/server"
import { prisma } from "@/prisma"

type GetEventInput = {
  params: {
    event: string
  }
}

// TODO: Tipar retorno das funções e criar um tipo padrão de erro
export async function GET(_: unknown, { params }: GetEventInput) {
  const eventDataFromDb = await prisma.event.findFirst({
    where: {
      slug: params.event,
    },
    select: {
      id: true,
      slug: true,
      name: true,
      _count: {
        select: {
          play: true,
        },
      },
    },
  })

  if (!eventDataFromDb) {
    return NextResponse.json(
      { message: `Não existe o evento ${params.event}` },
      {
        status: 404,
      },
    )
  }

  const eventData = {
    id: eventDataFromDb.id,
    slug: eventDataFromDb.slug,
    name: eventDataFromDb.name,
    participantsCount: eventDataFromDb._count.play,
  }

  return NextResponse.json(eventData)
}
