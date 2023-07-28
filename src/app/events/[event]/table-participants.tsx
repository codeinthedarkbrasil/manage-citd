import type { EditParticipant, Participant } from "@/shared/types"
import {
  DebouncedCheckbox,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components"
import { Trash2 as RemoveIcon } from "lucide-react"

type TableBodyProps = {
  participants: Participant[]
  onCheckParticipant: (args: { id: string; checked: boolean }) => void
  onRemoveParticipant: (id: string) => void
  editParticipantModal: (data: EditParticipant) => React.ReactNode
}

export function TableParticipants({
  participants,
  onCheckParticipant,
  onRemoveParticipant,
  editParticipantModal,
}: TableBodyProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sorteio</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Github</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {participants.map((participant) => (
          <TableRow
            key={participant.id}
            className={participant.gonnaPlay ? "bg-neutral-100" : ""}
          >
            <TableCell>
              <DebouncedCheckbox
                disabled={participant.gonnaPlay}
                defaultChecked={participant.wannaPlay}
                onCheckedChange={(checked) => {
                  if (typeof checked === "boolean") {
                    onCheckParticipant({ id: participant.id, checked })
                  }
                }}
              />
            </TableCell>
            <TableCell>{participant.name}</TableCell>
            <TableCell>{participant.email}</TableCell>
            <TableCell>
              <a
                href={`https://github.com/${participant.github}`}
                target="_blank"
              >
                @{participant.github}
              </a>
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                {participant.gonnaPlay === false && (
                  <button onClick={() => onRemoveParticipant(participant.id)}>
                    <RemoveIcon className="h-2 w-2 text-danger-100" />
                  </button>
                )}

                {editParticipantModal(participant)}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
