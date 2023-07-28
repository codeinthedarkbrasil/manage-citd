"use client"

import {
  FinalRound,
  ParticipantImage,
  ParticipantItem,
  ParticipantName,
  ParticipantsList,
  RoundTitle,
} from "@/components"
import { Round } from "@/shared/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { RefreshCcw, ThumbsUp } from "lucide-react"

import {
  getSelectedParticipants,
  selectNewRandomPlayer,
  setWinner,
} from "@/app/events/[event]/participants/data-participants"
import Link from "next/link"

type ParticipantsInGroupProps = {
  params: {
    event: string
    groupId: string
  }
}

export default function ParticipantsInGroup({
  params,
}: ParticipantsInGroupProps) {
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
        queryKey: ["participants", { event }],
      })
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

  const round =
    params.groupId === "final" ? finalRound : rounds[+params.groupId - 1]

  console.log({ round })

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
        <Link href={`/events/${event}/participants`}>
          Code in The Dark {params.event}
        </Link>
      </p>
      <h2 className="mb-16 mt-1 text-title-sm font-bold leading-normal text-neutral-900">
        Grupo {params.groupId}
      </h2>

      <FinalRound size="big">
        <ParticipantsList>
          {round?.participants.map((participant, index) => (
            <ParticipantItem key={participant.id}>
              <div className="group relative h-[69px] w-[69px] cursor-pointer">
                <ParticipantImage
                  src={`https://github.com/${participant.github}.png`}
                  alt={`${participant.name} photo`}
                  lined={index !== round.participants.length - 1}
                />

                {params.groupId !== "final" && (
                  <>
                    <button
                      className="absolute -top-1 right-0 z-aboveAll hidden h-[28px] w-[28px] items-center justify-center rounded-full bg-primary-100 group-hover:flex"
                      onClick={handleSelectNewRandomPlayer({
                        userId: participant.id,
                        event,
                        groupId: participant.groupId,
                      })}
                    >
                      <RefreshCcw size={18} />
                    </button>

                    <button
                      className="absolute -bottom-1 left-0 hidden h-[28px] w-[28px] items-center justify-center rounded-full bg-primary-100 transition-all group-hover:flex"
                      onClick={handleSetWinner({
                        userId: participant.id,
                        event,
                        groupId: participant.groupId,
                      })}
                    >
                      <ThumbsUp size={18} />
                    </button>
                  </>
                )}
              </div>

              <ParticipantName>{participant.name}</ParticipantName>
            </ParticipantItem>
          ))}
        </ParticipantsList>
      </FinalRound>
    </section>
  )
}
