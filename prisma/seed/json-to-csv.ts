import { writeFile } from "node:fs/promises"
import { participants } from "./participants"

async function main() {
  let content = "Nome;Email;GitHub\n"
  content += participants
    .map(({ name, email, github }) => `${name};${email};${github}`)
    .join("\n")

  await writeFile("./frontin.csv", content)
}

main()
