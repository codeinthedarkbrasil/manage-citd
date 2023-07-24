import {
  arrayOfParticipantsSchema,
  arrayOfParticipantsInGroupSchema,
  type Participant,
  type ParticipantInGroup,
  type RegisterParticipant,
  EditParticipant,
} from "@/shared/types"

export async function getParticipants(event: string): Promise<Participant[]> {
  const data = await fetch(`/api/events/${event}/participants`)
  const participants = await data.json()
  return arrayOfParticipantsSchema.parse(participants)
}

export async function getSelectedParticipants(
  event: string,
): Promise<ParticipantInGroup[]> {
  const data = await fetch(
    `/api/events/${event}/participants/select-participants`,
  )
  const selectedParticipants = await data.json()
  return arrayOfParticipantsInGroupSchema.parse(selectedParticipants)
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

type RegisterParticipantInput = {
  event: string
  data: RegisterParticipant
}

export async function registerParticipant({
  event,
  data,
}: RegisterParticipantInput) {
  const result = await fetch(
    `/api/events/${event}/participants/register-participant`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    },
  )

  const dataOrError = await result.json()

  if (!result.ok) {
    const { message } = dataOrError
    // TODO: handle the error in the future
    return Promise.reject(message)
  }

  return { data: dataOrError }
}

type EditParticipantInput = {
  event: string
  data: EditParticipant
}

export async function editParticipant({ event, data }: EditParticipantInput) {
  const result = await fetch(
    `/api/events/${event}/participants/edit-participant`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    },
  )

  const dataOrError = await result.json()

  if (!result.ok) {
    const { message } = dataOrError
    // TODO: handle the error in the future
    return Promise.reject(message)
  }

  return { data: dataOrError }
}

type SetWinnerInput = {
  userId: string
  event: string
  groupId: number
}
export async function setWinner({ userId, event, groupId }: SetWinnerInput) {
  await fetch(`/api/events/${event}/participants/${userId}/set-winner`, {
    method: "POST",
    body: JSON.stringify({ groupId }),
    headers: {
      "content-type": "application/json",
    },
  })
}

type SelectNewRandomPlayerInput = {
  userId: string
  event: string
  groupId: number
}
export async function selectNewRandomPlayer({
  userId,
  event,
  groupId,
}: SelectNewRandomPlayerInput) {
  await fetch(
    `/api/events/${event}/participants/${userId}/select-new-random-player`,
    {
      method: "POST",
      body: JSON.stringify({ groupId }),
      headers: {
        "content-type": "application/json",
      },
    },
  )
}

type RemoveParticipantInput = {
  id: string
  event: string
}
export async function removeParticipant({ id, event }: RemoveParticipantInput) {
  await fetch(`/api/events/${event}/participants/${id}/remove-participant`, {
    method: "DELETE",
  })
}
