/**
 * 初始化Yue实例
 */
export default function _init (options) {
  options = options || {}
  
  this.$options = options
  this.$data = options.data
  this.$el = document.querySelector(options.el)
  this.$template = this.$el.cloneNode(true)

  this._directives = []

  this.observer = this.observer.create(this.$data)
  this.observer.on('set', this._updateBindingAt.bind(this))

  if (options.el) {
    this.$mount()
  }
}
