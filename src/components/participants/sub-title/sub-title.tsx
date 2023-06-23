import { PropsWithChildren } from "react"

export function SubTitle({ children }: PropsWithChildren) {
  return (
    <p className="text-neutral-500 text-body-xs underline leading-normal">
      {children}
    </p>
  )
}
