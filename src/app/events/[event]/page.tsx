"use client"

import Link from "next/link"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TableParticipants } from "./table-participants"
import { Button, Checkbox, Input } from "@/components"
import { Filter as FilterIcon } from "lucide-react"
import {
  getParticipants,
  setSelectedParticipants,
  checkParticipant,
} from "./participants/data-participants"
import { getRandomInteger } from "./get-random-integer"

type EventProps = {
  params: {
    event: string
  }
}

type GenerateGroupsInput = {
  event: string
  ids: Set<string>
}
const generateGroups = async ({ event, ids }: GenerateGroupsInput) => {
  return setSelectedParticipants({ event, ids: Array.from(ids) })
}

export default function Event({ params }: EventProps) {
  const { event } = params

  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ["participants", { event }],
    queryFn: () => getParticipants(event),
  })

  const generateGroupsMutation = useMutation({
    mutationFn: generateGroups,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants", { event }] })
    },
  })

  const checkParticipantMutation = useMutation({
    mutationFn: checkParticipant,
  })

  const handleCheckParticipant = (id: string) => {
    checkParticipantMutation.mutate({ id, event })
  }

  const participants = query.data ?? []
  console.count("Event rendered")
  console.log("participants.length:", participants.length)
  console.log(
    "selected participants:",
    participants.filter((p) => p.gonnaPlay),
  )

  const handleGenerateGroups = () => {
    const selected = new Set<string>()
    const checkedParticipants = participants.filter((p) => p.wannaPlay)
    if (checkedParticipants.length < 16) {
      console.log("Não tem a quantidade mínima selecionada")
      return
    }

    while (selected.size < 16) {
      const rnd = getRandomInteger(participants.length - 1)
      const participant = participants[rnd]
      if (participant.wannaPlay) {
        selected.add(participants[rnd].id)
      }
    }
    console.log("all selected:", selected)
    generateGroupsMutation.mutate({ event, ids: selected })
  }

  return (
    <main className="pb-8 font-sans">
      <div className="mb-8 flex justify-between">
        <h1 className="text-[2.0rem] font-bold text-neutral-900">
          Code in the Dark {event}
        </h1>
        <nav>
          <ul className="flex gap-3">
            <li>
              <Button variant="text">Importar CSV</Button>
            </li>
            <li>
              <Button asChild>
                <Link href={`/events/${event}/participants/new`}>
                  Novo Participante
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[210px]">
            <Input
              icon={
                <FilterIcon className="h-[16px] w-[16px] text-neutral-500" />
              }
              placeholder="Buscar Participante"
            />
          </div>
          <div>
            <div className="flex gap-1">
              <Checkbox id="raffle-participants" />
              <label
                htmlFor="raffle-participants"
                className="text-[1.2rem] font-normal text-neutral-500"
              >
                Participantes do Sorteio
              </label>
            </div>
          </div>
        </div>
        <div>
          <Button variant="text" onClick={handleGenerateGroups}>
            Gerar chaves
          </Button>
        </div>
      </div>

      <TableParticipants
        event={event}
        participants={participants}
        onCheckParticipant={handleCheckParticipant}
      />
    </main>
  )
}
