import { PropsWithChildren } from "react"

export function ParticipantName({ children }: PropsWithChildren) {
  return (
    <span className="mt-[12px] flex h-[32px] place-items-center text-center text-body-xs font-semibold leading-normal text-neutral-900">
      {children}
    </span>
  )
}
