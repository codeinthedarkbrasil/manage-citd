"use client"

import Link from "next/link"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Modal,
  ModalTrigger,
  RegisterEventModal,
} from "@/components"
import { getEvents, registerEvent } from "./data-events"
import { RegisterEvent } from "@/shared/types"

export default function Events() {
  const queryClient = useQueryClient()

  const eventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  })

  const registerEventMutation = useMutation({
    mutationFn: registerEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] })
    },
  })

  const events = eventsQuery.data ?? []

  const handleRegisterEvent = async (data: RegisterEvent) => {
    registerEventMutation.mutate(data)
  }

  return (
    <div className="flex flex-col justify-between gap-4 font-sans text-neutral-900">
      <div className="flex items-center justify-between">
        <h1 className="text-title-sm font-bold text-neutral-900">Eventos</h1>
        <Modal>
          <ModalTrigger asChild>
            <Button>Novo evento</Button>
          </ModalTrigger>

          <RegisterEventModal
            onRegisterEvent={handleRegisterEvent}
            loading={registerEventMutation.isLoading}
            success={registerEventMutation.isSuccess}
            error={
              typeof registerEventMutation.error === "string"
                ? registerEventMutation.error
                : null
            }
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
