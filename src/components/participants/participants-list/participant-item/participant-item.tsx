import { PropsWithChildren } from "react"

export function ParticipantItem({ children }: PropsWithChildren) {
  return <li className="flex flex-col justify-center ml-2">{children}</li>
}
