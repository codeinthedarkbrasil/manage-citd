import Link from "next/link"
import { Button, Card, CardText, CardTitle } from "@/components"

export default function Events() {
  return (
    <div className="font-sans flex flex-col gap-4 justify-between text-neutral-900">
      <div className="flex items-center justify-between">
        <h1 className="text-title-sm text-neutral-900 font-bold">Eventos</h1>
        <Button>Novo evento</Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Card>
          <div className="py-3 px-2">
            <CardTitle>Code in The Dark 2022</CardTitle>
            <CardText>277 Participantes</CardText>
          </div>
        </Card>
        <Link href="/events/2023">
          <Card>
            <div className="py-3 px-2">
              <CardTitle>Code in The Dark 2022</CardTitle>
              <CardText>277 Participantes</CardText>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  )
}
