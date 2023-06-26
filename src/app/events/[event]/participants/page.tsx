import { EventProps } from "@/app/events/[event]/page"
import { RoundsList } from "@/components"
import { Round } from "@/shared/types"

export default function Participants({ params }: EventProps) {
  return (
    <section className="font-sans">
      <p className="text-neutral-500 text-body-xs underline leading-normal">
        Code in The Dark {params.event}
      </p>
      <h2 className="text-title-sm text-neutral-900 leading-normal font-bold mt-1">
        Gerenciar Chave
      </h2>
      <RoundsList rounds={rounds} />
    </section>
  )
}

const rounds: Round[] = [
  {
    participants: [
      {
        id: 1,
        avatarUrl: "https://avatars.githubusercontent.com/u/487669?v=4",
        name: "Fernando Daciuk",
      },
      {
        id: 2,
        avatarUrl: "https://avatars.githubusercontent.com/u/28938150?v=4",
        name: "Pablo Pinheiro",
      },
      {
        id: 3,
        avatarUrl: "https://avatars.githubusercontent.com/u/487669?v=4",
        name: "Fernando Daciuk",
      },
      {
        id: 4,
        avatarUrl: "https://avatars.githubusercontent.com/u/28938150?v=4",
        name: "Pablo Pinheiro",
      },
    ],
  },
  {
    participants: [
      {
        id: 5,
        avatarUrl: "https://avatars.githubusercontent.com/u/487669?v=4",
        name: "Fernando Daciuk",
      },
      {
        id: 6,
        avatarUrl: "https://avatars.githubusercontent.com/u/28938150?v=4",
        name: "Pablo Pinheiro",
      },
      {
        id: 7,
        avatarUrl: "https://avatars.githubusercontent.com/u/487669?v=4",
        name: "Fernando Daciuk",
      },
      {
        id: 8,
        avatarUrl: "https://avatars.githubusercontent.com/u/28938150?v=4",
        name: "Pablo Pinheiro",
      },
    ],
  },
  {
    participants: [
      {
        id: 9,
        avatarUrl: "https://avatars.githubusercontent.com/u/487669?v=4",
        name: "Fernando Daciuk",
      },
      {
        id: 10,
        avatarUrl: "https://avatars.githubusercontent.com/u/28938150?v=4",
        name: "Pablo Pinheiro",
      },
      {
        id: 11,
        avatarUrl: "https://avatars.githubusercontent.com/u/487669?v=4",
        name: "Fernando Daciuk",
      },
      {
        id: 12,
        avatarUrl: "https://avatars.githubusercontent.com/u/28938150?v=4",
        name: "Pablo Pinheiro",
      },
    ],
  },
  {
    participants: [
      {
        id: 13,
        avatarUrl: "https://avatars.githubusercontent.com/u/487669?v=4",
        name: "Fernando Daciuk",
      },
      {
        id: 14,
        avatarUrl: "https://avatars.githubusercontent.com/u/28938150?v=4",
        name: "Pablo Pinheiro",
      },
      {
        id: 15,
        avatarUrl: "https://avatars.githubusercontent.com/u/487669?v=4",
        name: "Fernando Daciuk",
      },
      {
        id: 16,
        avatarUrl: "https://avatars.githubusercontent.com/u/28938150?v=4",
        name: "Pablo Pinheiro",
      },
    ],
  },
]
