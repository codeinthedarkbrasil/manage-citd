"use client"

import Link from "next/link"
import type { Participant } from "./participants/data-participants"
import {
  Checkbox,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components"
import { Trash2 as RemoveIcon, Edit as EditIcon } from "lucide-react"

type TableBodyProps = {
  event: string
  participants: Participant[]
  onCheckParticipant: (id: string) => void
}

export function TableParticipants({
  event,
  participants,
  onCheckParticipant,
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
            className={participant.gonnaPlay ? "bg-danger-100" : ""}
          >
            <TableCell>
              <Checkbox
                defaultChecked={participant.wannaPlay}
                onChange={() => onCheckParticipant(participant.id)}
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
                <button>
                  <RemoveIcon className="h-2 w-2 text-danger-100" />
                </button>
                <Link
                  href={`/events/${event}/participants/${participant.id}/edit`}
                >
                  <EditIcon className="h-2 w-2 text-neutral-500" />
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
