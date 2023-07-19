import { z } from "zod"

const participantSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  github: z.string(),
  wannaPlay: z.coerce.boolean(),
  gonnaPlay: z.coerce.boolean(),
  winner: z.coerce.boolean(),
})

const groupIdSchema = z.object({
  groupId: z.number(),
})

const groupIdNullableSchema = z.object({
  groupId: z.number().nullable(),
})

const participantOutsideGroupSchema = z.intersection(
  participantSchema,
  groupIdNullableSchema,
)
const participantInGroupSchema = z.intersection(
  participantSchema,
  groupIdSchema,
)

export const arrayOfParticipantsSchema = z.array(participantOutsideGroupSchema)
export const arrayOfParticipantsInGroupSchema = z.array(
  participantInGroupSchema,
)

export type Participant = z.infer<typeof participantOutsideGroupSchema>

export const registerParticipantSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  github: z.string().optional(),
})

export type RegisterParticipant = z.infer<typeof registerParticipantSchema>

export type ParticipantInGroup = z.infer<typeof participantInGroupSchema>
