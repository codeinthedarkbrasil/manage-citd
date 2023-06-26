import { PropsWithChildren } from "react"

export function RoundsList({ children }: PropsWithChildren) {
  return (
    <div className="inline-block">
      <div className="inline-grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        {children}
      </div>
      <div className="m-auto w-[180px] h-[2px] bg-neutral-900 bg-opacity-[8%] my-10"></div>
    </div>
  )
}
