import { PropsWithChildren } from "react"
import Link from "next/link"

export function RoundTitle({ children }: PropsWithChildren) {
  return (
    <Link
      href="#"
      className="block text-body-sm font-semibold leading-tight text-neutral-500 transition-colors hover:text-primary-100"
    >
      {children}
    </Link>
  )
}
