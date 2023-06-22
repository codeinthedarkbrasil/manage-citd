import { Round } from "@/app/events/[event]/participants/page";
import { ParticipantsList } from "../participants-list";

interface RoundsListProps {
  rounds: Round[];
}

export function RoundsList({ rounds }: RoundsListProps) {
  return (
    <div className="inline-block">
      <div className="inline-flex flex-wrap md:gap-x-8 md:gap-y-10 max-w-[1000px]">
        {rounds.map((round, index) => (
          <div className="mt-8 md:mt-0" key={index}>
            <span className="text-neutral-500 text-sm font-semibold leading-tight block">
              {index + 1}º Round
            </span>
            <ParticipantsList participants={round.participants} />
          </div>
        ))}
      </div>
      <div className="m-auto w-[180px] h-[2px] bg-neutral-900 bg-opacity-[8%] my-10"></div>
    </div>
  );
}
