import { PropsWithChildren } from "react"

export function Title({ children }: PropsWithChildren) {
  return (
    <h2 className="text-title-sm text-neutral-900 leading-normal font-bold mt-1">
      {children}
    </h2>
  )
}
