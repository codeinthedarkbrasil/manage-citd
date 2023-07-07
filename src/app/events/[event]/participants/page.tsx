"use client"

import {
  ParticipantImage,
  ParticipantItem,
  ParticipantName,
  ParticipantsList,
  RoundItem,
  RoundTitle,
  RoundsList,
} from "@/components"
import { EventProps, Round } from "@/shared/types"
import { useQuery } from "@tanstack/react-query"
import { getSelectedParticipants } from "./data-participants"

export default function Participants({ params }: EventProps) {
  const { event } = params

  const query = useQuery({
    queryKey: ["selected-participants", { event }],
    queryFn: () => getSelectedParticipants(event),
  })

  const selectedParticipants = query.data ?? []

  const participantsPerRound = 4

  const rounds: Round[] = Array.from(
    { length: participantsPerRound },
    (_, index) => ({
      participants: selectedParticipants.slice(
        index * participantsPerRound,
        index * participantsPerRound + participantsPerRound,
      ),
    }),
  )

  return (
    <section className="font-sans">
      <p className="text-body-xs leading-normal text-neutral-500 underline">
        Code in The Dark {params.event}
      </p>
      <h2 className="mt-1 text-title-sm font-bold leading-normal text-neutral-900">
        Gerenciar Chave
      </h2>
      <RoundsList>
        {rounds.map((round, index) => (
          <RoundItem key={index}>
            <RoundTitle>{index + 1}º Round</RoundTitle>
            <ParticipantsList>
              {round.participants.map((participant, index) => (
                <ParticipantItem key={participant.id}>
                  <ParticipantImage
                    src={`https://github.com/${participant.github}.png`}
                    alt={`${participant.name} photo`}
                    lined={index !== round.participants.length - 1}
                  />
                  <ParticipantName>{participant.name}</ParticipantName>
                </ParticipantItem>
              ))}
            </ParticipantsList>
          </RoundItem>
        ))}
      </RoundsList>
    </section>
  )
}
