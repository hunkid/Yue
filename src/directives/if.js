/**
 * Created by Seant on 17/6/19
 */

import * as _ from '../util'
import Yue from '../index'
import config from '../config'

export default {
  /**
   * 创建一个注释节点替换原有的v-if节点
   */
  bind () {
    let tDom = this.tDom
    this.ref = document.createComment(`${config.prefix}-if`)
    _.after(this.ref, tDom)
    _.remove(tDom)
    this.inserted = false
  },
  /**
   * @param {Boolean} value 
   */
  update (value) {
    if (value) {
      if (!this.inserted) {
        if (!this.childYM) {
          this.build()
        }
        this.childYM.$before(this.ref)
        this.inserted = true
      }
    } else {
      if (this.inserted) {
        this.childYM.$remove()
        this.inserted = false
      }
    }
  },
  build () {
    this.childYM = new Yue({
      el: this.tDom,
      parent: this.vm
    })
  }
}