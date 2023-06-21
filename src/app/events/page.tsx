import Link from 'next/link'

export default function Events() {
  return (
    <main>
      <h1 className="font-sans text-neutral-900">Eventos</h1>
      <button className="font-sans text-primary-100">Novo Evento</button>

      <ul className="mt-3">
        <li>
          <EventItem
            link='/events/2022'
            title='Code in the Dark 2022'
            description='277 Participantes'
          />
        </li>
        <li>
          <EventItem
            link='/events/2023'
            title='Code in the Dark 2023'
            description='324 Participantes'
          />
        </li>
      </ul>
    </main>
  )
}

type EventItemProps = {
  link: string
  title: string
  description: string
}

function EventItem({ link, title, description }: EventItemProps) {
  return (
    <Link className="font-sans text-neutral-900" href={link}>
      <h2>{title}</h2>
      <p>{description}</p>
    </Link>
  )
}
