import { PropsWithChildren } from "react";

export function Card({ children }: PropsWithChildren) {
  return (
    <article className="bg-neutral-200 hover:translate-y-[-2px] hover:bg-neutral-200/90 transition-all duration-300 rounded-1">
      {children}
    </article>
  )
}

export function CardTitle({ children }: PropsWithChildren) {
  return (
    <h2 className="font-sans text-body-sm font-bold text-neutral-900">
      {children}
    </h2>
  )
}

export function CardText({ children }: PropsWithChildren) {
  return (
    <p className="font-sans text-body-sm font-medium text-neutral-400">
      {children}
    </p>
  )
}
