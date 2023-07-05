import { PropsWithChildren } from "react"

export function ParticipantName({ children }: PropsWithChildren) {
  return (
    <span className="mt-[12px] block text-body-xs font-semibold leading-normal text-neutral-900">
      {children}
    </span>
  )
}
