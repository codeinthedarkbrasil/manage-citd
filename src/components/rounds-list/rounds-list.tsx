import { Round } from "@/shared/types/round"
import {
  ParticipantImage,
  ParticipantItem,
  ParticipantName,
  ParticipantsList,
} from "@/components/participants"
import { Name } from "@/components/rounds-list"

type RoundsListProps = {
  rounds: Round[]
}

export function RoundsList({ rounds }: RoundsListProps) {
  return (
    <div className="inline-block">
      <div className="inline-grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        {rounds.map((round, index) => (
          <div className="mt-8 md:mt-0" key={index}>
            <Name>{index + 1}º Round</Name>
            <ParticipantsList>
              {round.participants.map((participant, index) => (
                <ParticipantItem key={participant.id}>
                  <ParticipantImage
                    src={participant.avatarUrl}
                    alt={`${participant.name} photo`}
                    lined={index !== round.participants.length - 1}
                  />
                  <ParticipantName>{participant.name}</ParticipantName>
                </ParticipantItem>
              ))}
            </ParticipantsList>
          </div>
        ))}
      </div>
      <div className="m-auto w-[180px] h-[2px] bg-neutral-900 bg-opacity-[8%] my-10"></div>
    </div>
  )
}
