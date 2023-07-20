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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  getSelectedParticipants,
  selectNewRandomPlayer,
  setWinner,
} from "./data-participants"

export default function Participants({ params }: EventProps) {
  const { event } = params
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ["selected-participants", { event }],
    queryFn: () => getSelectedParticipants(event),
  })

  const winnerMutation = useMutation({
    mutationFn: setWinner,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["selected-participants", { event }],
      })
    },
  })

  const selectNewRandomPlayerMutation = useMutation({
    mutationFn: selectNewRandomPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["selected-participants", { event }],
      })
    },
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

  type HandleSetWinnerInput = {
    userId: string
    event: string
    groupId: number
  }

  const handleSetWinner =
    ({ userId, event, groupId }: HandleSetWinnerInput) =>
    () => {
      winnerMutation.mutate({ userId, event, groupId })
    }

  type HandleSelectNewRandomPlayerInput = {
    userId: string
    event: string
    groupId: number
  }
  const handleSelectNewRandomPlayer =
    ({ userId, event, groupId }: HandleSelectNewRandomPlayerInput) =>
    () => {
      selectNewRandomPlayerMutation.mutate({ userId, event, groupId })
    }

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

                  <p className="my-1 text-primary-100">
                    <button
                      onClick={handleSetWinner({
                        userId: participant.id,
                        event,
                        groupId: participant.groupId,
                      })}
                    >
                      Definir vencedor
                    </button>
                  </p>
                  <p className="text-primary-100">
                    <button
                      onClick={handleSelectNewRandomPlayer({
                        userId: participant.id,
                        event,
                        groupId: participant.groupId,
                      })}
                    >
                      Selecionar outro
                    </button>
                  </p>
                </ParticipantItem>
              ))}
            </ParticipantsList>
          </RoundItem>
        ))}
      </RoundsList>

      <RoundsList>
        <RoundItem>
          <RoundTitle>Final</RoundTitle>
          <ParticipantsList>
            {finalRound.participants.map((participant, index) => (
              <ParticipantItem key={participant.id}>
                <ParticipantImage
                  src={`https://github.com/${participant.github}.png`}
                  alt={`${participant.name} photo`}
                  lined={index !== finalRound.participants.length - 1}
                />
                <ParticipantName>{participant.name}</ParticipantName>
              </ParticipantItem>
            ))}
          </ParticipantsList>
        </RoundItem>
      </RoundsList>
    </section>
  )
}
