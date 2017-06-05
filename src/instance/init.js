/**
 * 初始化Yue实例
 */

export default function _init (options) {
  options = options || {}
  
  this.$data = options.data
  this.$el = document.querySelector(options.el)

  if (options.el) {
    this.$mount()
  }
}