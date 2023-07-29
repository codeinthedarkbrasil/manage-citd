import { prisma } from "@/prisma"
import { participants } from "./participants"
import { getRandomInteger } from "@/lib"

async function main() {
  const event1 = await prisma.event.create({
    data: {
      name: "Code in the Dark 2022",
      slug: "2022",
    },
  })

  const event2 = await prisma.event.create({
    data: {
      name: "Code in the Dark 2023",
      slug: "2023",
    },
  })

  const events = [event1, event2]

  const promiseParticipants = participants.map((data) => {
    const rand = getRandomInteger(1)

    // const event = events[rand]
    const event = events[1]
    return prisma.user.create({
      data: {
        ...data,
        play: {
          create: {
            eventSlug: event.slug,
          },
        },
      },
    })
  })
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
