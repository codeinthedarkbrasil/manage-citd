import { PropsWithChildren } from "@/types/react";

export function ParticipantsTitle({ children }: PropsWithChildren) {
  return (
    <h2 className="text-2xl text-neutral-900 leading-normal font-bold mt-0.5">
      {children}
    </h2>
  );
}
