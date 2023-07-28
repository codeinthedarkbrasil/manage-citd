import { PropsWithChildren } from "react"

export function FinalRound({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center">
      <div className="w-[416px]">{children}</div>
    </div>
  )
}
