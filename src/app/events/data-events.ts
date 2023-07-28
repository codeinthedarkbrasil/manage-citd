import {
  type CITDEvent,
  type RegisterEvent,
  eventSchema,
  arrayOfEventsSchema,
} from "@/shared/types"

export async function getEvents(): Promise<CITDEvent[]> {
  const result = await fetch("/api/events")
  const events = await result.json()
  return arrayOfEventsSchema.parse(events)
}

export async function registerEvent(data: RegisterEvent): Promise<CITDEvent> {
  const result = await fetch("/api/events", {
    method: "POST",
    body: JSON.stringify(data),
  })
  const event = await result.json()
  return eventSchema.parse(event)
}
