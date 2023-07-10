import { arrayOfParticipantsSchema, type Participant } from "@/shared/types"

export async function getParticipants(event: string): Promise<Participant[]> {
  const data = await fetch(`/events/${event}/participants/api`)
  const participants = await data.json()
  return arrayOfParticipantsSchema.parse(participants)
}

export async function getSelectedParticipants(
  event: string,
): Promise<Participant[]> {
  const data = await fetch(
    `/events/${event}/participants/api/select-participants`,
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
