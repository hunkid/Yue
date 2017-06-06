/**
 * Created by Seant
 *  17/6/5
 */
import {extend} from './util'

import _init from './instance/init'
import * as lifecycle from './api/lifecycle'
import * as compile from './instance/compile'
import {$watch} from './api/data'
import Observer from './observer/observer'
export default function Yue (options) {
  this._init(options)
}

Yue.prototype = {
  constructor: Yue,
  _init,
  $watch,
  observer: Observer
}

extend(Yue.prototype, lifecycle)
extend(Yue.prototype, compile)
