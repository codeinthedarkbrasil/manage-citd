import { PropsWithChildren } from "react"

export function Name({ children }: PropsWithChildren) {
  return (
    <span className="text-neutral-500 text-body-sm font-semibold leading-tight block">
      {children}
    </span>
  )
}
