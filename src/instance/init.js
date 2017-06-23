/**
 * 初始化Yue实例
 */
import * as _ from '../util'

export function _init(options) {
  // 用来存储遍历DOM过程中生成的当前的Watcher
  // 在实现计算属性时用到 
  this._activeWatcher = null

  options = options || {}

  this.$options = options

  this.$parent = options.parent

  this.$children = []

  _.extend(this.$options, this.constructor.options)

  if (this.$parent) {
    this.$parent.$children.push(this)
    this.$data = options.parent.$data
  } else {
    this.$data = options.data || {}
  }

  if (options.data) {
    this.$data = options.data
  }

  this._initData(this.$data)

  this._initComputed() // 初始化计算属性

  this._initBindings() // 初始化Binding，给每一个data属性都绑定Binding

  this._directives = []

  if (options.el) {
    this.$mount(options.el)
  }
}