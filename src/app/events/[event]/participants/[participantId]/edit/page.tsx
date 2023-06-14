type EditParticipantProps = {
  params: {
    participantId: string
  }
}

export default function EditParticipant({ params }: EditParticipantProps) {
  console.log('params:', params)
  return (
    <h1>Edit participant: {params.participantId}</h1>
  )
}
