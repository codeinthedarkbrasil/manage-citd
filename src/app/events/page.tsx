"use client"

import { useState } from "react"
import Link from "next/link"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { RegisterEvent } from "@/shared/types"
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
        <RegisterEventModalContainer
          onRegisterEvent={handleRegisterEvent}
          isLoading={registerEventMutation.isLoading}
          isSuccess={registerEventMutation.isSuccess}
          error={registerEventMutation.error}
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {eventsQuery.isLoading && <p>Carregando eventos...</p>}
        {events.length === 0 && eventsQuery.isSuccess && (
          <p>Nenhum evento cadastrado.</p>
        )}
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

type RegisterEventModalContainerProps = {
  onRegisterEvent: (data: RegisterEvent) => Promise<void>
  isLoading: boolean
  isSuccess: boolean
  error: unknown
}
function RegisterEventModalContainer({
  onRegisterEvent,
  isLoading,
  isSuccess,
  error,
}: RegisterEventModalContainerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button>Novo evento</Button>
      </ModalTrigger>

      <RegisterEventModal
        open={open}
        onRegisterEvent={onRegisterEvent}
        loading={isLoading}
        success={isSuccess}
        error={typeof error === "string" ? error : null}
      />
    </Modal>
  )
}
