/**
 * @author Seant
 * @Date 17/6/21
 */

export function update (value) {
  let name = this.arg
  let el = this.tDom
  el.setAttribute(name, value)
}