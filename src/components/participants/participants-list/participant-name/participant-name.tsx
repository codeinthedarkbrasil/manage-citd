import { PropsWithChildren } from "react"

export function ParticipantName({ children }: PropsWithChildren) {
  return (
    <span className="text-neutral-900 text-body-xs font-semibold leading-normal block mt-[12px]">
      {children}
    </span>
  )
}
