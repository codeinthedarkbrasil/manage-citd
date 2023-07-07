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

export async function getParticipants(event: string): Promise<Participant[]> {
  const data = await fetch(`/events/${event}/participants/api`)
  const participants = await data.json()
  const result = arrayOfParticipants.parse(participants)
  return result
}

export async function getSelectedParticipants(event: string): Promise<Participant[]> {
  const data = await fetch(`/events/${event}/participants/api/select-participants`)
  const selectedParticipants = await data.json()
  const result = arrayOfParticipants.parse(selectedParticipants)
  return result
}


type SetSelectedParticipantsInput = {
  event: string
  ids: string[]
}
export async function setSelectedParticipants({
  event,
  ids,
}: SetSelectedParticipantsInput) {
  await fetch(`/events/${event}/participants/api/select-participants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids),
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
}
