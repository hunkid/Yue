/**
 * @author Seant
 * @date 17/6/23
 */
import * as _ from './util'

export default function installGlobalAPI(Yue) {
  Yue.extend = function (extendOptions) {
    let Super = this
    extendOptions = extendOptions || {}
    let Sub = createClass()
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.options = _.mergeOptions(Super.options, extendOptions)
    return Sub
  }

  function createClass() {
    return new Function('return function YueComponent(options){ this._init(options)}')()
  }
  /**
   * @param {String} 'my-component'
   * @param {YueComponent} 组件实例
   */
  Yue.component = function (id, definition) {
    this.options.components[id] = definition
    return definition
  }
}