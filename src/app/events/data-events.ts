import { CITDEvent, arrayOfEventsSchema } from "@/shared/types"

export async function getEvents(): Promise<CITDEvent[]> {
  const result = await fetch("/api/events")
  const events = await result.json()
  return arrayOfEventsSchema.parse(events)
}
