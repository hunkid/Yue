/**
 * 初始化Yue实例
 */
import * as _ from '../util'

export function _init (options) {
  options = options || {}
  this.$options = options
  _.extend(this.$options, this.constructor.options)
  this.$data = options.data || {}
  this._initData(this.$data)
  this._initComputed()
  this._initBindings()

  this._directives = []

  if (options.el) {
    this.$mount(options.el)
  }
}
