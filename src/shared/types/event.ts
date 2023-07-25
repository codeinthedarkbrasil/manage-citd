import { z } from "zod"

// TODO: Remover (ou ver o que fazer)
export type EventProps = {
  params: {
    event: string
  }
}

export const registerEventSchema = z.object({
  name: z.string(),
  slug: z.string(),
})

export type RegisterEvent = z.infer<typeof registerEventSchema>

export const eventSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  participantsCount: z.number(),
})

export const arrayOfEventsSchema = z.array(eventSchema)
export type CITDEvent = z.infer<typeof eventSchema>
