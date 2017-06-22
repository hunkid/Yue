
/**
 * 将'{{usr.name}}abcd'解析成[{tag: true, value: usr.name}, {value: abcd}]
 */
const tagRE = /\{?\{\{(.+?)\}\}\}?/g

export function parse(text) {
  if (text.trim() === '' || !tagRE.test(text)) return null
  let tokens = [],
    match, index, value, lastIndex = 0
  tagRE.lastIndex = 0
  while(match = tagRE.exec(text)) {
    index = match.index
    if (index > lastIndex) {
      tokens.push({
        value: text.slice(lastIndex, index)
      })
    }
    value = match[1]
    tokens.push({
      tag: true,
      value: value.trim()
    })
    lastIndex = index + match[0].length
  }
  if (lastIndex < text.length - 1) {
    tokens.push({
      value: text.slice(lastIndex)
    })
  }
  return tokens
}