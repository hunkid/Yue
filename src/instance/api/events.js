/**
 * @author Seant
 * @date Seant
 */

/**
 * @param {String} event
 * @param {Function} fn
 */
export function $on (event, fn) {
  (this._events[event] || (this._events[event] = [])).push(fn)
  return this
}

/**
 * 在当前实例中触发指定事件，执行对应的回调函数
 * @param {String} event 事件名称
 * @param {*} val 事件所携带的参数
 */
export function $emit (event, val) {
  let cbs = this._events[event]
  let shouldPropagate = true
  if (cbs) {
    shouldPropagate = false
    // 遍历执行事件
    let args = new Array(Array.from(arguments)[1]) // focus:这地方args到底是？
    cbs.forEach((cb) => {
      let res = cb.apply(this, args)
      if (res === true) {
        shouldPropagate = true
      }
    })
  }
  return shouldPropagate
}

/**
 * 向上冒泡事件，沿父链传播
 */
export function $dispatch (event, val) {
  // 在当前实例中触发该事件
  let shouldPropagate = this.$emit.apply(this, arguments)
  if (!shouldPropagate) {
    return this
  }
  let parent = this.$parent
  // 遍历父链
  while (parent) {
    shouldPropagate = parent.$emit.apply(parent, arguments)
    parent = shouldPropagate ? parent.$parent : null
  }
  return this
}
/**
 * 向下广播事件，沿子链传播
 * @param {String} event 
 * @param {*} val 
 */
export function $broadcast (event, val) {
  let children = this.$children
  let shouldPropagate = true
  children.forEach((child) => {
    shouldPropagate = child.$emit.apply(child, arguments)
    if (shouldPropagate) {
      child.$broadcast.apply(child, arguments)
    }
  })
  return this
}
