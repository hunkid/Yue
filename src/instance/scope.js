import Observer from '../observer/observer'

/**
 * @param {Object} data VM.$data
 */
export function _initData(data) {
  this.observer = Observer.create(data)
}

function noop() {}
export function _initComputed() {
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