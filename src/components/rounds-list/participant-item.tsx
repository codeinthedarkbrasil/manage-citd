import { PropsWithChildren } from "react"

export function ParticipantItem({ children }: PropsWithChildren) {
  return (
    <li className=" relative ml-2 flex w-[70px] flex-col justify-center">
      {children}
    </li>
  )
}
