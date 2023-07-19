import Link from "next/link"
import { Button, Card, CardText, CardTitle } from "@/components"

export default function Events() {
  return (
    <div className="flex flex-col justify-between gap-4 font-sans text-neutral-900">
      <div className="flex items-center justify-between">
        <h1 className="text-title-sm font-bold text-neutral-900">Eventos</h1>
        <Button>Novo evento</Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Link href="/events/2023">
          <Card>
            <div className="px-2 py-3">
              <CardTitle>Code in The Dark 2023</CardTitle>
              <CardText>277 Participantes</CardText>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  )
}
