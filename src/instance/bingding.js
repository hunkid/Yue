
import Binding from '../binding'

export function _updateBindingAt() {
  let path = arguments[1]
  let pathAry = path.split('.')
  let r = this._rootBinding
  pathAry.forEach((key) => {
    r = r[key]
  })
  let subs = r._subs
  subs.forEach((watcher) => {
    watcher.cb.call(watcher.ctx)
  })
}

export function _initBindings() {
  this._rootBinding = new Binding()
  this.observer.on('set', this._updateBindingAt.bind(this))
}

/**
 * 字面意思:在path路径下创建并返回一个bingding
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