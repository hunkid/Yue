import config from '../config' 

export function before(el, target) {
  target.parentNode.insertBefore(el, target)
}

export function after(el, target) {
  if (target.nextSibling) {
    before(el, target.nextSibling)
  } else {
    target.parentNode.appendChild(el)
  }
}

export function remove(el) {
  el.parentNode.removeChild(el)
}

/**
 * 将node节点的属性取出来并移除
 * 用于处理高级内置属性(如：v-if)
 * @param {HTML ELEMENT} node 
 * @param {String} attr 
 * @return {String | null}
 */
export function attr(node, attr) {
  attr = config.prefix + attr
  let val = node.getAttribute(attr)
  if (val) {
    node.removeAttribute(attr)
  }
  return val
}