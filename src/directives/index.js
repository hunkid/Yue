import * as _ from '../util'

import * as text from './text'
import * as attr from './attr'

import * as yif from './if'
import * as repeat from './repeat'
import * as on from './on'
var directives = {
  text,
  attr,
  if: {},
  on: {},
  repeat: {}
}
_.extend(directives.if, yif.default)
_.extend(directives.on, on.default)
_.extend(directives.repeat, repeat.default)
export default directives