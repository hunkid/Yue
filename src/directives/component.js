/**
 * @author Seant
 * @date 17/6/25
 */

import * as _ from '../util'
import config from '../config'

export default {
  bind () {
    if (!this.el.__vue__) {
      this.anchor = document.createComment(`${config.prefix}component`)
      _.replace(this.el, this.anchor)
      this.setComponent(this.expression)
    }
  },
  update () {

  },
  /**
   * 设置组件
   * @param {String} value e.g 'my-component' 
   */
  setComponent (value) {
    if (value) {
      this.Component = this.vm.$options.components[value]
      this.mountComponent()
    }
  },
  /**
   * 构建、挂载组件实例
   */
  mountComponent () {
    let newComponent = this.build()
    newComponent.$before(this.anchor)
  },
  build () {
    if (this.Component) {
      let options = {
        name: this.ComponentName,
        el: this.el.cloneNode(),
        parent: this.vm,
        isComponent: true
      }
      let child = new this.Component(options)
      return child
    }
  }
}