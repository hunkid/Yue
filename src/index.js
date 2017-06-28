/**
 * Created by Seant
 *  17/6/5
 */
import * as _ from './util'

import * as _init from './instance/init'
import * as lifecycle from './api/lifecycle'
import * as compile from './instance/compile'
import * as data from './api/data'
import * as bingding from './instance/bingding'
import * as scope from './instance/scope'
import * as element from './instance/element'
import * as directives from './directives'
import * as dom from './api/dom'
import * as compileProps from './compiler/compile-props'
import * as aevents from './instance/api/events'
import * as events from './instance/events'

import installGlobalAPI from './global-api'

import Observer from './observer/observer'
export default function Yue (options) {
  this._init(options)
}

Yue.prototype = {
  constructor: Yue,
  observer: Observer
}

Yue.options = {
  directives: directives['default'],
  components: {}
}

_.extend(Yue.prototype, _init)
_.extend(Yue.prototype, lifecycle)
_.extend(Yue.prototype, compile)
_.extend(Yue.prototype, data)
_.extend(Yue.prototype, dom)
_.extend(Yue.prototype, bingding)
_.extend(Yue.prototype, scope)
_.extend(Yue.prototype, element)
_.extend(Yue.prototype, compileProps)
_.extend(Yue.prototype, aevents)
_.extend(Yue.prototype, events)

installGlobalAPI(Yue)