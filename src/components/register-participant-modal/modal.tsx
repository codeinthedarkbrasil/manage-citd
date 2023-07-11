"use client"

import { Button } from "../button"
import { Input } from "../input"
import { ModalContent } from "../modal"
import { User, AtSign, Github } from "lucide-react"

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  github: z.string().min(1, { message: "Github user is required" }),
})

type FormSchemaValues = z.infer<typeof formSchema>

export function RegisterParticipantModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaValues>({
    resolver: zodResolver(formSchema),
  })

  const handleRegisterParticpant: SubmitHandler<FormSchemaValues> = (data) => {
    console.log(data)
  }

  return (
    <ModalContent>
      <div className="w-full min-w-[380px] px-[32px] py-[42px]">
        <h2 className="font-sans text-[1.6rem] font-semibold text-neutral-900">
          Novo Participante
        </h2>
        <form
          className="mt-[24px] flex flex-col gap-3"
          onSubmit={handleSubmit(handleRegisterParticpant)}
        >
          <Input
            placeholder="Nome"
            icon={<User className="h-[16px] w-[16px] text-neutral-500" />}
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            placeholder="Email"
            icon={<AtSign className="h-[16px] w-[16px] text-neutral-500" />}
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            placeholder="Github"
            icon={<Github className="h-[16px] w-[16px] text-neutral-500" />}
            error={errors.github?.message}
            {...register("github")}
          />

          <Button>Confirmar</Button>
        </form>
      </div>
    </ModalContent>
  )
}
