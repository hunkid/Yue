import * as text from './text'
import * as yif from './if'
import * as _ from '../util'
var directives = {
  text,
  if: {}
}
_.extend(directives.if, yif.default)
export default directives