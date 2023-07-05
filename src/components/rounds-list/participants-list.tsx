import { PropsWithChildren } from "react"

export function ParticipantsList({ children }: PropsWithChildren) {
  return <ul className="mt-[12px] inline-flex">{children}</ul>
}
