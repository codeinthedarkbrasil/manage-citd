import { PropsWithChildren } from "react"

export function RoundTitle({ children }: PropsWithChildren) {
  return (
    <span className="text-neutral-500 text-body-sm font-semibold leading-tight block">
      {children}
    </span>
  )
}
