export const pluralize = (words, count) =>
  `${words[0]}${count.length === 1 ? '' : 's'}`

export function pluralise(word = '', count = 0) {
  if (count === 1) return word

  if (word.endsWith('ry')) return `${word.substr(0, word.length - 1)}ies`
  if (word.endsWith('s') || word.endsWith('th')) return `${word}es`
  return `${word}s`
}
