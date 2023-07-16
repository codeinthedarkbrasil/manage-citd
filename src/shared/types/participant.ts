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

export type RegisterParticipant = Pick<Participant, "name" | "email" | "github">
