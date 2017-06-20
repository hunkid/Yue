/**
 * Created by Seant on 17/6/19.
 * 本文件的对DOM的操作操作yue实例
 * 而util里面的dom.js的操作对象都是一般的DOM节点
 */

import * as _ from '../util'

/**
 * 插入yue实例
 * @param target {Element}
 */
export function $before (target) {
  _.before(this.$el, target)
}

/**
 * 移除yue实例
 */
export function $remove () {
  if (this.$el.parentNode) {
    _.remove(this.$el)
  }
}