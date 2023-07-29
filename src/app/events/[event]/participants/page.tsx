"use client"

import {
  FinalRound,
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
import Link from "next/link"

export default function Participants({ params }: EventProps) {
  const { event } = params

  const query = useQuery({
    queryKey: ["selected-participants", { event }],
    queryFn: () => getSelectedParticipants(event),
  })

  const selectedParticipants = query.data ?? []

  const rounds = selectedParticipants.reduce<Round[]>((acc, participant) => {
    const groupId = participant.groupId

    acc[groupId - 1] = acc[groupId - 1] ?? {}
    acc[groupId - 1].participants = acc[groupId - 1].participants ?? []
    acc[groupId - 1].participants.push(participant)
    return acc
  }, [])

  const finalRound = rounds.reduce(
    (acc, round) => {
      const winner = round.participants.find(
        (participant) => participant.winner === true,
      )
      if (winner) {
        acc.participants.push(winner)
      }
      return acc
    },
    { participants: [] },
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
            <Link href={`/events/${event}/participants/${index + 1}`}>
              <RoundTitle>{index + 1}º Round</RoundTitle>
            </Link>
            <ParticipantsList>
              {round.participants.map((participant, index) => (
                <ParticipantItem key={participant.id}>
                  <div className="group relative h-[69px] w-[69px] cursor-pointer">
                    <ParticipantImage
                      src="/ghost.jpeg"
                      alt={`? photo`}
                      lined={index !== round.participants.length - 1}
                      hasWinner={round.participants.some((p) => p.winner)}
                      winner={participant.winner}
                    />
                  </div>

                  <ParticipantName>
                    {round.participants.some((p) => p.winner)
                      ? participant.name
                      : "??"}
                  </ParticipantName>
                </ParticipantItem>
              ))}
            </ParticipantsList>
          </RoundItem>
        ))}
      </RoundsList>

      {finalRound.participants.length > 0 && (
        <FinalRound>
          <Link href={`/events/${event}/participants/final`}>
            <RoundTitle>Final</RoundTitle>
          </Link>
          <ParticipantsList>
            {finalRound.participants.map((participant, index) => (
              <ParticipantItem key={participant.id}>
                <ParticipantImage
                  src={
                    participant.github === "ghost"
                      ? "/ghost.jpeg"
                      : `https://github.com/${participant.github}.png`
                  }
                  alt={`${participant.name} photo`}
                  lined={index !== finalRound.participants.length - 1}
                />
                <ParticipantName>{participant.name}</ParticipantName>
              </ParticipantItem>
            ))}
          </ParticipantsList>
        </FinalRound>
      )}
    </section>
  )
}
