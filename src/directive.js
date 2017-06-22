import Watcher from './watcher'
import * as _ from './util'

/**
 * 指令构造函数
 * @param {string} name 值为"text", 代表是文本节点
 * @param {HTML Element} tDom 对应的DOM元素
 * @param {Yue} vm  yue实例
 * @param {Object} descriptor 指令描述符，形如{expression: 'usr.name'})
 * @constructor
 */

function Directive(name, tDom, vm, descriptor) {
  this.name = name
  this.tDom = tDom
  this.vm = vm
  this.expression = descriptor.expression
  // this.attr = 'nodeValue'
  this.arg = descriptor.arg
  this._initDef()
  this._bind()
}

Directive.prototype._update = function () {
  this.update(this._watcher.get())  // 这地方并没有采用this._watcher.value，原因在于value值并不是动态变化的
}

/**
 * 给指令增加watcher
 */
Directive.prototype._bind = function () {
  if (!this.expression) return

  this.bind && this.bind()

  this._watcher = new Watcher(
    this.vm,
    this.expression,
    this._update,
    this
  )
  
  this.update(this._watcher.value) // 注意
}

/**
 * 不同指令对应的更新？
 */
Directive.prototype._initDef = function () { // TODO:
  let def = this.vm.$options.directives[this.name]
  _.extend(this, def)
}

export default Directive