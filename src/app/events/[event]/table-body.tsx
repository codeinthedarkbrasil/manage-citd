import Link from 'next/link'
import type { Participant } from './participants/data-participants'

type TableBodyProps = {
  event: string
  participants: Participant[]
  onCheckParticipant: (id: string) => void
}

export function TableBody({ event, participants, onCheckParticipant }: TableBodyProps) {
  return (
    <tbody>
      {participants.map(participant => (
        <tr key={participant.id} className={participant.gonnaPlay ? 'bg-red-500' : ''}>
          <td>
            <input
              type='checkbox'
              className='w-8 h-8'
              defaultChecked={participant.wannaPlay}
              onClick={() => onCheckParticipant(participant.id)}
            />
          </td>
          <td>{participant.name}</td>
          <td>{participant.email}</td>
          <td><a href={`https://github.com/${participant.github}`} target='_blank'>@{participant.github}</a></td>
          <td>
            <button>Remover</button>
            <Link href={`/events/${event}/participants/${participant.id}/edit`}>Editar</Link>
          </td>
        </tr>
      ))}
    </tbody>
  )
}
