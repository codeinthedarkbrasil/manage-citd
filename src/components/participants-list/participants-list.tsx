import { PropsWithChildren } from "@/types/react";

export function ParticipantsList({ children }: PropsWithChildren) {
  return (
      <ul className="inline-flex mt-[12px]">
        {children}
      </ul>
  )
}
