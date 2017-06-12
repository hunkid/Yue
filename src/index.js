/**
 * Created by Seant
 *  17/6/5
 */
import {extend} from './util'

import * as _init from './instance/init'
import * as lifecycle from './api/lifecycle'
import * as compile from './instance/compile'
import * as data from './api/data'
import * as bingding from './instance/bingding'
import * as scope from './instance/scope'
import * as element from './instance/element'

import Observer from './observer/observer'
import Directive from './directive'

export default function Yue (options) {
  this._init(options)
}

Yue.prototype = {
  constructor: Yue,
  observer: Observer
}

Yue.options = {
  directives: Directive
}

extend(Yue.prototype, _init)
extend(Yue.prototype, lifecycle)
extend(Yue.prototype, compile)
extend(Yue.prototype, data)
extend(Yue.prototype, bingding)
extend(Yue.prototype, scope)
extend(Yue.prototype, element)