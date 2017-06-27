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

export function replace(oldN, newN) {
  let parent = oldN.parentNode
  parent.insertBefore(newN, oldN)
  parent.removeChild(oldN)
}

/**
 * 获取动态数据绑定属性值
 * @param {HTML ELEMENT} node 
 * @param {String} name 
 * @return {String} 属性值
 */
export function getBindAttr(node, name) {
  return getAttr(node, `:${name}`) || getAttr(node, `${config.prefix}bind:${name}`)
}

/**
 * 获取节点属性值,并且移除该属性
 */
export function getAttr(node, attr) {
  let val = node.getAttribute(attr)
  if (val) {
    node.removeAttribute(attr)
  }
  return val
}

/**
 * 事件监听
 * @param {HTML Element} el 
 * @param {String} event 
 * @param {Function} cb 
 */
export function on(el, event, cb) {
  el.addEventListener(event, cb)
}