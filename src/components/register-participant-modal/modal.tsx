import { Button } from "../button"
import { Input } from "../input"
import { ModalContent } from "../modal"
import { User, AtSign, Github } from "lucide-react"

export function RegisterParticipantModal() {
  return (
    <ModalContent>
      <div className="w-full min-w-[380px] px-[32px] py-[42px]">
        <h2 className="font-sans text-[1.6rem] font-semibold text-neutral-900">
          Novo Participante
        </h2>
        <form className="mt-[24px] flex flex-col gap-3">
          <Input
            placeholder="Nome"
            icon={<User className="h-[16px] w-[16px] text-neutral-500" />}
          />
          <Input
            placeholder="Email"
            icon={<AtSign className="h-[16px] w-[16px] text-neutral-500" />}
          />
          <Input
            placeholder="Github"
            icon={<Github className="h-[16px] w-[16px] text-neutral-500" />}
          />

          <Button>Confirmar</Button>
        </form>
      </div>
    </ModalContent>
  )
}
