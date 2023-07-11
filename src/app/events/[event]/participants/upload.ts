"use server"

import { prisma } from "@/prisma"

export const upload = async (data: FormData) => {
  const file = data.get("file")
  const event = data.get("event")
  if (!file) {
    // TODO
    console.log("Não veio arquivo nenhum nem evento")
    return
  }

  if (!event) {
    // TODO
    console.log("Não veio o evento.")
    return
  }

  if (!(file instanceof File)) {
    // TODO
    console.log("Não é um arquivo válido")
    return
  }

  if (typeof event !== "string") {
    // TODO
    console.log("evento não é string")
    return
  }

  const bytes = await file.arrayBuffer()
  const csv = Buffer.from(bytes).toString()
  try {
    await saveInDb({ csv, event })
  } catch (e) {
    // TODO
    console.log("deu ruim na hora de salvar no banco:", e)
  }
}

type SaveInDbInput = {
  csv: string
  event: string
}

async function saveInDb({ csv, event }: SaveInDbInput) {
  const participants = csv.split("\n").slice(1)
  const promiseParticipants = participants.map((line) => {
    const [name, email, github] = line.split(";")

    return prisma.user.create({
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
  })
  return Promise.all(promiseParticipants)
}
