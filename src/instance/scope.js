import Observer from '../observer/observer'
import * as _ from '../util'
/**
 * @param {Object} data VM.$data
 */
export function _initData (data) {
  this.observer = Observer.create(data)
}

function noop() {}

export function _initComputed () {
  var computed = this.$options.computed
  if (computed) {
    for (var key in computed) {
      var def = computed[key]
      if (typeof def === 'function') {
        def = {
          get: def,
          set: noop,
          enumerable: true,
          configurable: true
        }
        Object.defineProperty(this.$data, key, def)
      }
    }
  }
}

export function _initMethods () {
  var methods = this.$options
  if (methods) {
    for (let key in methods) {
      this[key] = methods[key]
    }
  }
}

export function _initProxy () {
  for (let key in this.$data) {
    _.proxy(this, this.$data, key)
  }
}

export function _initProps () {
  let isComponent = this.$options.isComponent
  if (!isComponent) return
  let el = this.$options.el
  let attrs = Array.from(el.attributes)
  attrs.forEach((attr) => {
    let attrName = attr.name
    let attrValue = attr.value
    this.$data[attrName] = attrValue
  })
}