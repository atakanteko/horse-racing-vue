// Source - https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  let currentIndex = shuffled.length

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    const temp = shuffled[currentIndex]!
    shuffled[currentIndex] = shuffled[randomIndex]!
    shuffled[randomIndex] = temp
  }

  return shuffled
}
