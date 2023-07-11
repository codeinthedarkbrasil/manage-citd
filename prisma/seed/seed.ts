import { prisma } from "@/prisma"
import { participants } from "./participants"

async function main() {
  const event = await prisma.event.create({
    data: {
      name: "Code in the Dark 2023",
      slug: "2023",
    },
  })

  const promiseParticipants = participants.map((data) =>
    prisma.user.create({
      data: {
        ...data,
        play: {
          create: {
            eventSlug: event.slug,
          },
        },
      },
    }),
  )
  await Promise.all(promiseParticipants)
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
