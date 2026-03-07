// Source - https://medium.com/@will.software.engineer/generate-an-array-of-unique-non-repeating-elements-in-javascript-992b585da29a
export function getRandomElements<T>(list: readonly T[], count: number): T[] {
  if (count <= 0) return []
  if (count >= list.length) return [...list]

  const arrayCopy = [...list]
  const newArray: T[] = []

  for (let i = 0; i < count; i++) {
    const randNum = Math.floor(Math.random() * arrayCopy.length)
    const splicedItem = arrayCopy.splice(randNum, 1)[0]
    if (splicedItem !== undefined) {
      newArray.push(splicedItem)
    }
  }

  return newArray
}
