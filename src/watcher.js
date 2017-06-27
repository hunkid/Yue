import {
  Batcher
} from './batcher'
import {
  compileGetter
} from './parse/expression'
import Observer from './observer/observer'

let uid = 0
let batcher = new Batcher()
/**
 * Watcher构造函数
 * 1. 当指令对应的数据发生改变的时候, 执行更新DOM的update函数
 * 2. 当$watch API对应的数据发生改变的时候, 执行你自己定义的回调函数
 * @param vm {Bue} bue实例
 * @param expression {String} 表达式, 例如: "user.name"
 * @param cb {Function} 当对应的数据更新的时候执行的回调函数
 * @param ctx {Object} 回调函数执行上下文
 * @constructor
 */
function Watcher(vm, expression, cb, ctx) {
  this.id = ++uid
  this.vm = vm
  this.expression = expression
  this.cb = cb
  this.ctx = ctx || vm
  this.deps = Object.create(null)
  this.getter = compileGetter(expression)
  this.initDeps(expression)
}

Watcher.prototype.initDeps = function (path) {
  this.addDep(path)
  this.value = this.get()
}

Watcher.prototype.beforeGet = function () {
  Observer.emitGet = true
  this.vm._activeWatcher = this
}

Watcher.prototype.afterGet = function () {
  this.vm._activeWatcher = null
  Observer.emitGet = false
}

Watcher.prototype.get = function () {
  this.beforeGet()
  let value = this.getter.call(this.vm, this.vm.$data)
  this.afterGet()
  return value
}

/**
 * 根据给出的路径, 去获取或创建binding对象,
 * 然后把当前的watcher对象添加到创建的binding对象上
 * @param path {string} 指令表达式对应的路径, 例如"user.name"
 */
Watcher.prototype.addDep = function (path) {
  let vm = this.vm
  let deps = this.deps
  if (deps[path]) return
  deps[path] = true
  let binding = vm._getBindingAt(path) || vm._createBindingAt(path)
  binding._addSub(this)
}

/**
 * 当数据发生更新的时候, 就是触发notify
 * 然后冒泡到顶层的时候, 就是触发updateBindingAt
 * 对应的binding包含的watcher的update方法就会被触发。
 * 就是执行watcher的cb回调。
 * 然后, watcher的cb回调是什么呢?
 * 两种情况, 如果是$watch调用的话,那么是你自己定义的回调函数。
 * 如果是directive调用的话,
 * 那么就是directive的_update方法。
 * 那么directive的_update方法是什么呢?
 * 其实就是各自对应的更新方法。比如对应文本节点来说, 就是更新nodeValue的值
 */
Watcher.prototype.update = function () {
  if (!batcher.isFlushing) {
    batcher.push(this)
  } else {
    setTimeout(() => {
      batcher.push(this)
    })
  }
}

/**
 * 用于batcher批处理更新
 */
Watcher.prototype.run = function () {
  this.cb.call(this.ctx, arguments)
}
export default Watcher