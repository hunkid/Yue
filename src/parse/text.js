
/**
 * 将'{{usr.name}}abcd'解析成[{tag: true, value: usr.name}, {value: abcd}]
 */
export function parse(text) {
  let res = []
  let tagRE = /\{?\{\{(.+?)\}\}\}?/g
  let match, index, value, lastIndex = 0
  while(match = tagRE.exec(text)) {
    index = match.index
    if (index > lastIndex) {
      res.push({
        value: text.slice(lastIndex, index)
      })
    }
    value = match[1]
    res.push({
      tag: true,
      value: value.trim()
    })
    lastIndex = index + match[0].length
  }
  if (lastIndex < text.length - 1) {
    res.push({
      value: text.slice(lastIndex)
    })
  }
  return res
}