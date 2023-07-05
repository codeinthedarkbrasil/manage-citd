import { PropsWithChildren } from "react"

export function RoundsList({ children }: PropsWithChildren) {
  return (
    <div className="inline-block">
      <div className="inline-grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        {children}
      </div>
      <div className="m-auto my-10 h-[2px] w-[180px] bg-neutral-900 bg-opacity-[8%]"></div>
    </div>
  )
}
