"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { PropsWithChildren } from "react"

const queryClient = new QueryClient()

export default function EventLayout({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
