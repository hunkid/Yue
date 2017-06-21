/**
 * Created by Seant on 17/6/12.
 */

/**
 * 格式转换TODO:
 * @param s {string} 例如: user.name
 * @returns {Array} [{expression: "user.name"}]
 */
export function parse(s) {
  let dirs = []
  if (s.indexOf(':') !== -1) {
    // 属性指令 data-id:user.id
    let ss = s.split(':')
    dirs.push({
      raw: s,
      arg: ss[0],
      expression: ss[1]
    })
  } else {
    // 文本指令  user.name
    dirs.push({
      raw: s,
      expression: s
    })
  }
  return dirs
}