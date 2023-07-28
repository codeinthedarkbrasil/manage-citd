import { PropsWithChildren } from "react"

type FinalRoundProps = PropsWithChildren & {
  size?: "big"
}
export function FinalRound({ children, size }: FinalRoundProps) {
  return (
    <div className="flex justify-center">
      <div className={`w-[416px] ${size === "big" ? "scale-150" : ""}`}>
        {children}
      </div>
    </div>
  )
}
