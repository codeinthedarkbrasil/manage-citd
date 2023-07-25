"use client"

import { ChangeEvent, useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TableParticipants } from "./table-participants"
import {
  Button,
  Checkbox,
  EditParticipantModal,
  Input,
  Modal,
  ModalTrigger,
  RegisterParticipantModal,
} from "@/components"
import { Filter as FilterIcon, Edit as EditIcon } from "lucide-react"
import {
  getParticipants,
  setSelectedParticipants,
  checkParticipant,
  registerParticipant,
  removeParticipant,
  editParticipant,
} from "./participants/data-participants"
import { upload } from "./participants/upload"
import { getRandomInteger } from "@/lib/get-random-integer"
import { EditParticipant, RegisterParticipant } from "@/shared/types"

type EventProps = {
  params: {
    event: string
  }
}

type GenerateGroupsInput = {
  event: string
  ids: Set<string>
}
const generateGroups = async ({ event, ids }: GenerateGroupsInput) => {
  return setSelectedParticipants({ event, ids: Array.from(ids) })
}

export default function Event({ params }: EventProps) {
  const { event } = params
  const router = useRouter()

  const [value, setValue] = useState("")

  const [isOnlyRaffle, setIsOnlyRaffle] = useState(false)

  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ["participants", { event }],
    queryFn: () => getParticipants(event),
  })

  const generateGroupsMutation = useMutation({
    mutationFn: generateGroups,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants", { event }] })
      router.push(`/events/${event}/participants`)
    },
  })

  const checkParticipantMutation = useMutation({
    mutationFn: checkParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants", { event }] })
    },
  })

  const registerParticipantMutation = useMutation({
    mutationFn: registerParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants", { event }] })
    },
  })

  const removeParticipantMutation = useMutation({
    mutationFn: removeParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants", { event }] })
    },
  })

  const editParticipantMutation = useMutation({
    mutationFn: editParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants", { event }] })
    },
  })

  const handleRegisterParticipant = async (data: RegisterParticipant) => {
    registerParticipantMutation.mutate({ data, event })
  }

  const handleEditParticipant = useCallback(
    async (data: EditParticipant) => {
      console.log("edit participant:", data)
      await editParticipantMutation.mutateAsync({ data, event })
    },
    [editParticipantMutation, event],
  )

  const editParticipantModal = useCallback(
    (participant: EditParticipant) => (
      <EditParticipantModalContainer
        participant={participant}
        onEditParticipant={handleEditParticipant}
        error={editParticipantMutation.error}
        isError={editParticipantMutation.isError}
        isLoading={editParticipantMutation.isLoading}
      />
    ),
    [
      editParticipantMutation.error,
      editParticipantMutation.isLoading,
      editParticipantMutation.isError,
      handleEditParticipant,
    ],
  )

  const handleCheckParticipant = ({
    id,
    checked,
  }: {
    id: string
    checked: boolean
  }) => {
    checkParticipantMutation.mutate({ id, checked, event })
  }

  const handleSetOnlyRaffle = () => {
    setIsOnlyRaffle((prev) => !prev)
  }

  const participants = query.data ?? []
  const filteredParticipants = participants.filter((p) => {
    const isOnlyRaffleCondition = isOnlyRaffle ? p.wannaPlay : true
    if (value === "") return isOnlyRaffleCondition

    const name = p.name.toLowerCase()
    const email = p.email.toLowerCase()
    const github = p.github.toLowerCase()

    const search = value.toLowerCase()

    return (
      (name.includes(search) ||
        email.includes(search) ||
        github.includes(search)) &&
      isOnlyRaffleCondition
    )
  })

  const handleGenerateGroups = () => {
    const selected = new Set<string>()
    const checkedParticipants = filteredParticipants.filter((p) => p.wannaPlay)
    if (checkedParticipants.length < 16) {
      // TODO: Mostrar erro na tela
      console.log("Não tem a quantidade mínima selecionada")
      return
    }

    while (selected.size < 16) {
      const rnd = getRandomInteger(filteredParticipants.length - 1)
      const participant = filteredParticipants[rnd]
      if (participant.wannaPlay) {
        selected.add(filteredParticipants[rnd].id)
      }
    }
    generateGroupsMutation.mutate({ event, ids: selected })
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.form?.submit()
  }

  const handleRemoveParticipant = (id: string) => {
    removeParticipantMutation.mutate({ id, event })
  }

  return (
    <main className="pb-8 font-sans">
      <div className="mb-8 flex justify-between">
        <h1 className="text-[2.0rem] font-bold text-neutral-900">
          Code in the Dark {event}
        </h1>
        <nav>
          <ul className="flex gap-3">
            <li className="group relative flex w-[130px] overflow-hidden ">
              <form action={upload} className="absolute top-[6px] z-[hidden]">
                <input
                  type="file"
                  name="file"
                  className="h-[30px]  text-[16px] text-neutral-100  "
                  onChange={handleFileUpload}
                />
                <input type="hidden" name="event" value={event} />
              </form>
              <Button variant="file">Importar CSV</Button>
            </li>
            <li>
              <RegisterParticipantModalContainer
                onRegisterParticipant={handleRegisterParticipant}
                isLoading={registerParticipantMutation.isLoading}
                isSuccess={registerParticipantMutation.isSuccess}
                error={registerParticipantMutation.error}
              />
            </li>
          </ul>
        </nav>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[210px]">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              icon={
                <FilterIcon className="h-[16px] w-[16px] text-neutral-500" />
              }
              placeholder="Buscar Participante"
            />
          </div>
          <div>
            <div className="flex gap-1">
              <Checkbox
                id="raffle-participants"
                checked={isOnlyRaffle}
                onCheckedChange={handleSetOnlyRaffle}
              />
              <label
                htmlFor="raffle-participants"
                className="text-[1.2rem] font-normal text-neutral-500"
              >
                Participantes do Sorteio
              </label>
            </div>
          </div>
        </div>
        <div>
          <Button variant="text" onClick={handleGenerateGroups}>
            Gerar chaves
          </Button>
        </div>
      </div>

      <TableParticipants
        participants={filteredParticipants}
        onCheckParticipant={handleCheckParticipant}
        onRemoveParticipant={handleRemoveParticipant}
        editParticipantModal={editParticipantModal}
      />
    </main>
  )
}

type EditParticipantModalContainerProps = {
  participant: EditParticipant
  onEditParticipant: (data: EditParticipant) => Promise<void>
  isLoading: boolean
  isError: boolean
  error: unknown
}
function EditParticipantModalContainer({
  participant,
  onEditParticipant,
  isLoading,
  isError,
  error,
}: EditParticipantModalContainerProps) {
  const [openEditModal, setOpenEditModal] = useState(false)

  const handleEditParticipant = async (participant: EditParticipant) => {
    await onEditParticipant(participant)
    setOpenEditModal(false)
  }

  return (
    <Modal open={openEditModal} onOpenChange={setOpenEditModal}>
      <ModalTrigger>
        <EditIcon className="h-2 w-2 text-neutral-500" />
      </ModalTrigger>
      <EditParticipantModal
        onEditParticipant={handleEditParticipant}
        loading={isLoading}
        success={isError}
        error={typeof error === "string" ? error : null}
        initialData={participant}
      />
    </Modal>
  )
}

type RegisterParticipantModalContainerProps = {
  onRegisterParticipant: (data: RegisterParticipant) => Promise<void>
  isLoading: boolean
  isSuccess: boolean
  error: unknown
}

function RegisterParticipantModalContainer({
  onRegisterParticipant,
  isLoading,
  isSuccess,
  error,
}: RegisterParticipantModalContainerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button>Novo Participante</Button>
      </ModalTrigger>
      <RegisterParticipantModal
        onRegisterParticipant={onRegisterParticipant}
        loading={isLoading}
        success={isSuccess}
        error={typeof error === "string" ? error : null}
        open={open}
      />
    </Modal>
  )
}
