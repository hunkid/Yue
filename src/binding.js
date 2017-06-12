function Binding() {
  // 用于存放watcher实例作为订阅者
  this._subs = []
}

/**
 * 用于新增一个键值对，若已经存在则直接返回
 */
Binding.prototype._addChild = function(key) {
  this[key] = this[key] || new Binding()
  return this[key]
}

Binding.prototype._addSub = function(watcher) {
  this._subs.push(watcher)
}

export default Binding