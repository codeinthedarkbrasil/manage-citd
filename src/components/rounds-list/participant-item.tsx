import { PropsWithChildren } from "react"

export function ParticipantItem({ children }: PropsWithChildren) {
  return <li className="ml-2 flex flex-col justify-center">{children}</li>
}
