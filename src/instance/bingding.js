
import Binding from '../binding'

export function _updateBindingAt() {
  let path = arguments[1]
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

export function _initBindings() {
  this._rootBinding = new Binding()
  this.observer.on('set', this._updateBindingAt.bind(this)) // 在顶层注册set事件
               .on('get', this._collectDep.bind(this))
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