import { PropsWithChildren } from "@/types/react";

export function ParticipantsSubTitle({ children }: PropsWithChildren) {
  return (
    <p className="text-neutral-500 text-xs underline leading-normal">
      {children}
    </p>
  );
}
