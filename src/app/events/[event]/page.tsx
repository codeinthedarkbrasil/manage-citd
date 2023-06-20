'use client'

import Link from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TableBody } from './table-body'
import { getParticipants, setSelectedParticipants, checkParticipant } from './participants/data-participants'
import { getRandomInteger } from './get-random-integer'

type EventProps = {
  params: {
    event: string
  }
}

const generateGroups = async (ids: Set<string>) => {
  return setSelectedParticipants(Array.from(ids))
}

export default function Event({ params }: EventProps) {
  const { event } = params

  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['participants', { event }],
    queryFn: () => getParticipants(event),
  })

  const generateGroupsMutation = useMutation({
    mutationFn: generateGroups,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participants', { event }] })
    },
  })

  const checkParticipantMutation = useMutation({
    mutationFn: checkParticipant,
  })

  const handleCheckParticipant = (id: string) => {
    checkParticipantMutation.mutate(id)
  }

  const participants = query.data ?? []
  console.count('Event rendered')
  console.log('participants.length:', participants.length)
  console.log('selected participants:', participants.filter(p => p.gonnaPlay))

  const handleGenerateGroups = () => {
    const selected = new Set<string>()
    const checkedParticipants = participants.filter(p => p.wannaPlay)
    if (checkedParticipants.length < 16) {
      console.log('Não tem a quantidade mínima selecionada')
      return
    }

    while (selected.size < 16) {
      const rnd = getRandomInteger(participants.length - 1)
      const participant = participants[rnd]
      if (participant.wannaPlay) {
        selected.add(participants[rnd].id)
      }
    }
    console.log('all selected:', selected)
    generateGroupsMutation.mutate(selected)
  }

  return (
    <main>
      <h1>Code in the Dark {event}</h1>
      <nav>
        <ul>
          <li>
            <button>Importar CSV</button>
          </li>
          <li>
            <Link href={`/events/${event}/participants/new`}>Novo Participante</Link>
          </li>
          <li>
            <button onClick={handleGenerateGroups}>Gerar chaves</button>
          </li>
        </ul>
      </nav>

      <table>
        <thead>
          <tr>
            <th>Sorteio</th>
            <th>Nome</th>
            <th>Email</th>
            <th>GitHub</th>
            <th>Ações</th>
          </tr>
        </thead>
        <TableBody
          event={event}
          participants={participants}
          onCheckParticipant={handleCheckParticipant}
        />
      </table>
    </main>
  )
}
