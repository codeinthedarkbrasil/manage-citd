import { useEffect, useState } from "react"

import { Button } from "../button"
import { Input } from "../input"
import { ModalContent } from "../modal"
import {
  User,
  AtSign,
  Github,
  ArrowLeft,
  CheckCircle,
  XCircle,
} from "lucide-react"

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { EditParticipant, editParticipantSchema } from "@/shared/types"

export type EditParticipantModalProps = {
  onEditParticipant: (data: EditParticipant) => Promise<void>
  loading?: boolean
  success: boolean | null
  error: string | null
  initialData: EditParticipant
}

export function EditParticipantModal({
  onEditParticipant,
  loading,
  success,
  error,
  initialData,
}: EditParticipantModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditParticipant>({
    resolver: zodResolver(editParticipantSchema),
  })

  const [internalSuccess, setInternalSuccess] = useState(success)
  const [internalError, setInternalError] = useState(error)

  useEffect(() => {
    setInternalSuccess(success)
    setInternalError(error)
  }, [success, error])

  useEffect(() => {
    if (success) {
      reset()
    }
  }, [success, reset])

  const handleEditParticipant: SubmitHandler<EditParticipant> = async (
    data,
  ) => {
    await onEditParticipant(data)
  }

  const handleBackToForm = () => {
    setInternalSuccess(null)
    setInternalError(null)
  }

  return (
    <ModalContent>
      <div className="relative flex w-full min-w-[380px] flex-col justify-center px-[32px] py-[42px]">
        {(internalSuccess || internalError) && (
          <>
            <div className="absolute left-[24px] top-[24px]">
              <Button variant="text" onClick={handleBackToForm}>
                <ArrowLeft />
              </Button>
            </div>

            <div className="mt-[42px] flex flex-col gap-4">
              <div className="flex flex-col items-center justify-center gap-2">
                {internalSuccess && (
                  <>
                    <CheckCircle className="h-[64px] w-[64px] text-primary-100" />
                    <p className="font-sans text-[1.8rem] font-semibold text-neutral-900">
                      Registrado com sucesso!
                    </p>
                  </>
                )}
                {!!internalError && (
                  <>
                    <XCircle className="h-[64px] w-[64px] text-danger-100" />
                    <p className="font-sans text-[1.8rem] font-semibold text-neutral-900">
                      {error}
                    </p>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {!internalSuccess && !internalError && (
          <>
            <h2 className="font-sans text-[1.6rem] font-semibold text-neutral-900">
              Editar Participante
            </h2>
            <form
              className="mt-[24px] flex flex-col gap-3"
              onSubmit={handleSubmit(handleEditParticipant)}
            >
              <input type="hidden" value={initialData.id} {...register("id")} />
              <Input
                placeholder="Nome"
                defaultValue={initialData.name}
                icon={<User className="h-[16px] w-[16px] text-neutral-500" />}
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                placeholder="Email"
                defaultValue={initialData.email}
                icon={<AtSign className="h-[16px] w-[16px] text-neutral-500" />}
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                placeholder="Github"
                defaultValue={initialData.github}
                icon={<Github className="h-[16px] w-[16px] text-neutral-500" />}
                error={errors.github?.message}
                {...register("github")}
              />

              <Button disabled={loading} loading={loading}>
                Confirmar
              </Button>
            </form>
          </>
        )}
      </div>
    </ModalContent>
  )
}
