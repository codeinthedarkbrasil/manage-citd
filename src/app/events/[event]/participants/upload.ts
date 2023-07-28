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
  await saveInDb({ csv, event })
}

type SaveInDbInput = {
  csv: string
  event: string
}

async function saveInDb({ csv, event }: SaveInDbInput) {
  const participants = csv.split("\n").slice(1)
  const participantsFiltered = participants.filter(Boolean)

  const promiseParticipants = participantsFiltered.map((line) => {
    const [, , , name, lastName, email] = line.split(",")

    return prisma.user.create({
      data: {
        name: name.trim() + " " + lastName.trim(),
        email: email.trim(),
        play: {
          create: {
            eventSlug: event,
            wannaPlay: true,
          },
        },
      },
    })
  })

  const result = await Promise.allSettled(promiseParticipants)
  result
    .filter((r) => r.status === "rejected")
    .forEach((r) => console.log("Deu ruim na hora de salvar no banco:", r))
}
