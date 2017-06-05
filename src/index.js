/**
 * Created by Seant
 *  17/6/5
 */
import {extend} from './util'

import _init from './instance/init'
import * as lifecycle from './api/lifecycle'
import * as compile from './instance/compile'

export default function Yue (options) {
  this._init(options)
}

Yue.prototype = {
  constructor: Yue,
  _init
}

extend(Yue.prototype, lifecycle)
extend(Yue.prototype, compile)
