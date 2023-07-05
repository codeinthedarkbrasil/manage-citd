import { participants } from "./fake-participants"
import { z } from "zod"

const participantSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  github: z.string(),
  wannaPlay: z.coerce.boolean(),
  gonnaPlay: z.coerce.boolean(),
})

export type Participant = z.infer<typeof participantSchema>

const arrayOfParticipants = z.array(participantSchema)

export async function getParticipants(event: string, search: string): Promise<Participant[]> {
  const data = await fetch(`/events/${event}/participants/api?search=${search}`)
  const participants = await data.json()
  const result = arrayOfParticipants.parse(participants)
  return result
}

type SetSelectedParticipantsInput = {
  event: string
  ids: string[]
}
export async function setSelectedParticipants({
  event: _event,
  ids,
}: SetSelectedParticipantsInput) {
  // await fetch(`/events/${event}/participants/api/select-participants`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(ids),
  // })
  participants
    .filter((p) => p.gonnaPlay)
    .forEach((p) => {
      p.gonnaPlay = false
    })

  ids.forEach((id) => {
    const participant = participants.find((p) => p.id === id)
    if (!participant) {
      throw new Error(`Usuário não encontrado: ${id}`)
    }
    participant.gonnaPlay = true
  })
}

type CheckParticipantInput = {
  id: string
  event: string
  checked: boolean
}

export async function checkParticipant({
  id,
  checked,
  event,
}: CheckParticipantInput) {
  console.log("check participant checked?", checked)
  await fetch(`/events/${event}/participants/${id}/api/check-participant`, {
    method: "POST",
    body: JSON.stringify({ checked }),
    headers: {
      "content-type": "application/json",
    },
  })
  // const participant = participants.find((p) => p.id === id)
  // if (!participant) {
  //   throw new Error("Participante não encontrado")
  // }
  // participant.wannaPlay = !participant.wannaPlay
}
