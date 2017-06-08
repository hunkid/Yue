/**
 * 初始化Yue实例
 */
export default function _init (options) {
  options = options || {}
  
  this.$options = options
  this.$data = options.data
  this.$el = document.querySelector(options.el)
  this.$template = this.$el.cloneNode(true)

  this.observer = this.observer.create(this.$data)
  this.observer.on('set', this.$mount.bind(this))

  if (options.el) {
    this.$mount()
  }
}