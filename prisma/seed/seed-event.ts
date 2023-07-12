import { prisma } from "@/prisma"

async function main() {
  await prisma.event.create({
    data: {
      name: "Code in the Dark 2023",
      slug: "2023",
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
  })
