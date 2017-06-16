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
  dirs.push({
    expression: s
  })
  return dirs
}
