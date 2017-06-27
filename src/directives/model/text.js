/**
 * @author Seant
 * @date 17/6/11
 */
import * as _ from '../../util'
export default {
  bind() {
    let el = this.tDom
    this.handler = () => {
      this.vm.$set(this.expression, el.value)
    }
    _.on(el, 'input', this.handler)
  },
  update() {
    this.tDom.value = value
  }
}
