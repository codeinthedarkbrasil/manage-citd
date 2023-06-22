import { Participant } from "@/app/events/[event]/participants/page";

interface ParticipantListProps {
  participants: Participant[];
}

export function ParticipantsList({ participants }: ParticipantListProps) {
  return (
    participants.length && (
      <ul className="inline-flex mt-[12px]">
        {participants.map((participant, index) => (
          <li
            className="flex flex-col justify-center ml-2"
            key={participant.id}
          >
            <div
              className={`w-[69px] h-[69px] border-2 border-primary-100 rounded-full ${
                index !== participants.length - 1
                  ? "after:content-[''] after:h-[1px] after:width-1/2 after:right-1 after:w-full after:bg-primary-100 after:absolute after:top-1/2 relative after:translate-x-1/2 after:left-1/2"
                  : ""
              }`}
              style={{
                borderRadius: "50%",
              }}
            >
              <img
                src={participant.avatarUrl}
                alt={`${participant.name} photo`}
                className="w-full h-full object-cover relative z-10"
                style={{
                  borderRadius: "inherit",
                }}
              />
            </div>
            <span className="text-neutral-900 text-xs font-semibold leading-normal block mt-[12px]">
              {participant.name}
            </span>
          </li>
        ))}
      </ul>
    )
  );
}
