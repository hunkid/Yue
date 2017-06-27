/**
 * @author Seant
 * @date 17/6/27
 */

export default {
  bind () {
    this.vm.initProp(this.arg, this.expression, true)
  },
  update (value) {
    this.vm.$set(this.arg, value)
  }
}
