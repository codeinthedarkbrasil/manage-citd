import { prisma } from "@/prisma"
import { NextResponse } from "next/server"

export async function GET(_request: Request) {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export async function POST(_request: Request) {}
