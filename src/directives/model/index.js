/**
 * @author Seant
 * @date 17/6/27
 */

import * as _ from '../../util'
import * as text from './text'

const handlers = {
  text
}

_.extend(handlers.text, text.default)

export function bind() {
  let el = this.tDom
  let tag = el.tagName
  let handler
  if (tag === 'INPUT') {
    handler = handlers.text
  } else {
    console.warn(`v-model doesn't support element type: ${tag}`)
    return
  }
  handler.bind.call(this)
  this.update = handler.update
  this.unbind = handler.unbind
}
