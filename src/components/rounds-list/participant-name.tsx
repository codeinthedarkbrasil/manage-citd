import { PropsWithChildren } from "react"

export function ParticipantName({ children }: PropsWithChildren) {
  return (
    <p className="mt-[12px] h-[32px] w-full place-items-center text-center text-body-xs font-semibold leading-normal text-neutral-900">
      {children}
    </p>
  )
}
