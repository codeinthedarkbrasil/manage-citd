import { PropsWithChildren } from "react"

export function ParticipantsList({ children }: PropsWithChildren) {
  return (
    <ul className="mt-[12px] inline-flex min-w-[113px] justify-center gap-3">
      {children}
    </ul>
  )
}
