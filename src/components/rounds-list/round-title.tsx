import { PropsWithChildren } from "react"

export function RoundTitle({ children }: PropsWithChildren) {
  return (
    <span className="block text-body-sm font-semibold leading-tight text-neutral-500">
      {children}
    </span>
  )
}
