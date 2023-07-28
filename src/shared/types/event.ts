import { z } from "zod"
import slugify from "slugify"

// TODO: Remover (ou ver o que fazer)
export type EventProps = {
  params: {
    event: string
  }
}

export const registerEventSchema = z.object({
  name: z.string(),
  slug: z
    .string()
    .refine(
      (val) => val === slugify(val, { trim: true, lower: true }),
      "Slug inválido",
    ),
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
