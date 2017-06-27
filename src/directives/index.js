import * as _ from '../util'

import * as text from './text'
import * as attr from './attr'
import * as model from './model'

import * as yif from './if'
import * as repeat from './repeat'
import * as on from './on'
import * as component from './component'
import * as prop from './prop'
var directives = {
  text,
  attr,
  model,
  if: {},
  on: {},
  repeat: {},
  component: {},
  prop: {}
}
_.extend(directives.if, yif.default)
_.extend(directives.on, on.default)
_.extend(directives.repeat, repeat.default)
_.extend(directives.component, component.default)
_.extend(directives.prop, prop.default)
export default directives