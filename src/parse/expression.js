/**
 * Created by Seant on 17/6/16
 */

export function compileGetter (path) {
  path = path.split('.')
  let body = 'if (o != null'
  let pathString = 'o'
  let key
  for (var i = 0, n = path.length - 1; i < n; i++) { // 注意是n = path.length - 1
    key = path[i]
    pathString += `.${key}`
    body += ` && ${pathString} != null`  
  }
  key = path[path.length - 1]
  pathString += `.${key}`
  body += `) return ${pathString}`
  return new Function('o', body)
}
