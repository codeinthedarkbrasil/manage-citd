import { z } from "zod"

const participantSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  github: z.string(),
  wannaPlay: z.coerce.boolean(),
  gonnaPlay: z.coerce.boolean(),
  winner: z.coerce.boolean(),
  groupId: z.number().nullable(),
})

export const arrayOfParticipantsSchema = z.array(participantSchema)

export type Participant = z.infer<typeof participantSchema>

export const registerParticipantSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  github: z.string().min(1, { message: "Github user is required" }),
})

export type RegisterParticipant = z.infer<typeof registerParticipantSchema>
