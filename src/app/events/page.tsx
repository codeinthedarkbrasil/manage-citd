"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Modal,
  ModalTrigger,
  RegisterEventModal,
} from "@/components"
import { getEvents } from "./data-events"

export default function Events() {
  const eventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  })

  const events = eventsQuery.data ?? []

  return (
    <div className="flex flex-col justify-between gap-4 font-sans text-neutral-900">
      <div className="flex items-center justify-between">
        <h1 className="text-title-sm font-bold text-neutral-900">Eventos</h1>
        <Modal>
          <ModalTrigger asChild>
            <Button>Novo evento</Button>
          </ModalTrigger>

          <RegisterEventModal
            onRegisterEvent={async () => {}}
            loading={false}
            success={false}
            error={null}
          />
        </Modal>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {events.length === 0 && <p>Nenhum evento cadastrado.</p>}
        {events.map((event) => (
          <Link href={`/events/${event.slug}`} key={event.id}>
            <Card>
              <div className="px-2 py-3">
                <CardTitle>{event.name}</CardTitle>
                <CardText>{event.participantsCount} Participantes</CardText>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
