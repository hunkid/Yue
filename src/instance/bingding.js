
import Binding from '../binding'

export function _updateBindingAt() {
  
  this._updateSelfBindingAt(...arguments)
  // this._updateChildrenBindingAt(...arguments)
}

export function _initBindings() {
  this._rootBinding = new Binding()
  this.observer.on('set', this._updateBindingAt.bind(this)) // 在顶层注册set事件
               .on('get', this._collectDep.bind(this))
}

export function _updateSelfBindingAt (event, path) {
  let pathAry = path.split('.')
  let r = this._rootBinding
  pathAry.forEach((key) => {
    r = r[key]
  })
  if (!r) return
  let subs = r._subs
  subs.forEach((watcher) => {
    watcher.cb.call(watcher.ctx)
  })
}

/**
 * 执行本实例所有子实例发生了数据变动的watcher
 */
export function _updateChildrenBindingAt () {
  if (!this.$children.length) return
  this.$children.forEach((child) => {
    child._updateBindingAt(...arguments)
  })
}

/**
 * 根据路径返回binding
 * @param {String} path 
 * @return {false | Binding}
 */
export function _getBindingAt (path) {
  let b = this._rootBinding
  let pathAry = path.split('.')
  for (var i = 0, n = pathAry.length; i < n; i++) {
    b = b[pathAry[i]]
    if (!b) return false
  }
  return b
}
/**
 * 字面意思:在path路径下创建并返回一个binding
 * 每一级都会创建一个binding
 * @param {String} path 
 */
export function _createBindingAt(path) {
  let b = this._rootBinding
  let pathAry = path.split('.')
  pathAry.forEach((key) => {
    b = b[key] = b._addChild(key)
  })
  return b
}

export function _collectDep(event, path) {
  let watcher = this._activeWatcher
  if (watcher) {
    watcher.addDep(path)
  }
}