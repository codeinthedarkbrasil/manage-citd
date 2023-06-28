import { participants } from "./fake-participants"

export type Participant = {
  id: string
  name: string
  email: string
  github: string
  wannaPlay: boolean
  gonnaPlay?: boolean
}

export async function getParticipants(event: string): Promise<Participant[]> {
  const data = await fetch(`/events/${event}/participants/api`)
  const participants = await data.json()
  return participants
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

export async function checkParticipant(id: string) {
  const participant = participants.find((p) => p.id === id)
  if (!participant) {
    throw new Error("Participante não encontrado")
  }
  participant.wannaPlay = !participant.wannaPlay
}
