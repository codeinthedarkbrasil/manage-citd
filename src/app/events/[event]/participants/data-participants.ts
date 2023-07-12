import { arrayOfParticipantsSchema, type Participant } from "@/shared/types"

export async function getParticipants(event: string): Promise<Participant[]> {
  const data = await fetch(`/api/events/${event}/participants`)
  const participants = await data.json()
  return arrayOfParticipantsSchema.parse(participants)
}

export async function getSelectedParticipants(
  event: string,
): Promise<Participant[]> {
  const data = await fetch(
    `/api/events/${event}/participants/select-participants`,
  )
  const selectedParticipants = await data.json()
  return arrayOfParticipantsSchema.parse(selectedParticipants)
}

type SetSelectedParticipantsInput = {
  event: string
  ids: string[]
}
export async function setSelectedParticipants({
  event,
  ids,
}: SetSelectedParticipantsInput) {
  await fetch(`/api/events/${event}/participants/select-participants`, {
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
  await fetch(`/api/events/${event}/participants/${id}/check-participant`, {
    method: "POST",
    body: JSON.stringify({ checked }),
    headers: {
      "content-type": "application/json",
    },
  })
}
