import { redirect } from "next/navigation"

export default async function Home() {
  // TODO: Ver o que vamos fazer na página inicial
  redirect("/events")
}
