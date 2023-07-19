import { writeFile } from "node:fs/promises"
import { participants } from "./participants"

async function main() {
  const title =
    "N. do pedido,Data do pedido,Status do participante,Nome,Sobrenome,E-mail\n"
  let content = title
  content += participants
    .map(({ name, email }) => {
      const [firstName, ...lastNameArray] = name.split(" ")
      const lastName = lastNameArray.join(" ")
      return `0,0/0/00 10:40 AM,0,${firstName},${lastName},${email}`
    })
    .join("\n")

  await writeFile("./frontin.csv", content)
}

main()
