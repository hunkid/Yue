/**
 * Created by Seant on 17/6/21
 */

export default {
  update (handler) {
    if (typeof handler !== 'function') {
      console.warn(`指令v-on:${this.expression}不是一个函数`)
      return
    }
    this.reset()
    this.handler = handler
    this.tDom.addEventListener(this.arg, this.handler)
  },
  reset () {
    if (!this.handler) return
    this.tDom.removeEventListener(this.arg, this.handler)
  }
}
