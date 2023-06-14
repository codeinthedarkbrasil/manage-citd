import { MersenneTwister19937, integer } from 'random-js'

const engine = MersenneTwister19937.autoSeed()

export function getRandomInteger(to: number) {
  const distribution = integer(0, to)
  return distribution(engine)
}
