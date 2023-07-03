import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma"

type CheckParticipantInput = {
  params: {
    event: string
    participantId: string
  }
}

export async function POST(
  request: NextRequest,
  { event, participantId }: CheckParticipantInput,
) {
  const body = request.body
  console.log({ body })

  return new NextResponse()

  // await prisma.user.update({
  //   data: {
  //     play: {
  //       update: {
  //         data: {
  //           wannaPlay:
  //         }
  //       }
  //     }
  //   }
  // })
}
