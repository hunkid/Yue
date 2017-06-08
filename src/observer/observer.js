/**
 * created by Seant
 *  2017.6.2
 */

import objectAugmentations from './object-augmentations'
import arrayAugmentations from './array-augmentations'
import * as _ from '../util'

const ARRAY = 0
const OBJECT = 1

/**
 * Observer构造函数
 * @constructor
 * @param {Array|Object} value
 * @param {Number} type
 */

export default function Observer(value, type) {
  this.value = value
  this.type = type
  if (value) {
    _.define(value, '$observer', this)
    if (type === ARRAY) {
      _.augment(value, arrayAugmentations)
      this.link(value)
    } else if (type === OBJECT) {
      _.augment(value, objectAugmentations)
      this.walk(value)
    }
  }
}

/**
 * get事件触发的全局控制开关
 */
Observer.emitGet = false

Observer.prototype.walk = function (obj) {
  var key, val
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      val = obj[key]
      this.observe(key, val)
      this.convert(key, val)
    }
  }
}
/**
 * 为了观察数组中的元素为对象的情况
 * @param {Array} item
 */
Observer.prototype.link = function (item) {
  item.forEach((i) => this.observe(i))
}
/**
 * 创建一个观察者 TODO:
 * 为什么要将ob的父用例
 */
Observer.prototype.observe = function (key, val) {
  var ob = Observer.create(val)
  if (ob) {
    // TODO:
    ob.parent = {
      ob: this,
      key: key
    }
  }
}

/**
 * 将一个属性转变成getter/setter，这样可触发事件
 */
Observer.prototype.convert = function (key, val) {
  var prefix = key.charAt(0)
  if (prefix === '_' || prefix === '$') {
    return
  }
  var ob = this
  Object.defineProperty(this.value, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      if (Observer.emitGet) {
        ob.notify('get', key)
      }
      return val
    },
    set: function (newVal) {
      if (newVal === val) return
      val = newVal
      console.log(`你设置了新的${key}为${val}`)
      ob.notify(`set:${key}`, key, newVal)
      ob.notify('set', key, newVal)
    }
  })
}

/**
 * 订阅事件
 * @param event {string} 事件类型
 * @param fn {Function} 对调函数
 * @returns {Observer} 观察者对象
 */
Observer.prototype.on = function (event, fn) {
  this._cbs = this._cbs || {}
  if (!this._cbs[event]) {
    this._cbs[event] = []
  }
  this._cbs[event].push(fn)
  return this
}


/**
 * 取消订阅事件
 * @param event {string} 事件类型
 * @param fn {Function} 回调函数
 * @returns {Observer} 观察者对象
 */
Observer.prototype.off = function (event, fn) {
  this._cbs = this._cbs || {}

  // 取消所有订阅事件
  if (!arguments.length) {
    this._cbs = {}
    return this
  }

  let callbacks = this._cbs[event]
  if (!callbacks) return this

  // 取消特定事件
  if (arguments.length === 1) {
    delete this._cbs[event]
    return this
  }

  // 取消特定事件的特定回调函数
  for (let i = 0, cb; i < callbacks.length; i++) {
    cb = callbacks[i]
    if (cb === fn) {
      callbacks.splice(i, 1)
      break
    }
  }
  return this
}

/**
 * 触发事件，逐级通知父级
 */
Observer.prototype.notify = function (event, path, val) {
  console.log(`event${event}`)
  this.emit(event, path, val)
  if (!this.parents) return
  var parent = this.parent
  var ob = parent.ob
  var key = parent.key
  var parentPath
  // 此处为为了兼容数组的情况 TODO:
  if (path) {
    parentPath = `${key}.${path}`
  } else {
    parentPath = key
  }
  ob.notify(event, parentPath, val)
}

Observer.prototype.emit = function (event, path, val) {
  this._cbs = this._cbs || {} //这样的私有属性，其实提前定义类中更加清晰
  let callbacks = this._cbs[event]
  if (!callbacks) return
  callbacks = callbacks.slice(0)
  callbacks.forEach((cb, i) => {
    cb.apply(this, arguments) //运用arguments的意义？
  })
}

/**
 * 根据不同数据创建观察者
 */
Observer.create = function (val) {
  if (val &&
      val.hasOwnProperty('$observer') &&
      val.$observer instanceof Observer) {
    return val.$observer
  }
  if (_.isArray(val)) {
    return new Observer(val, ARRAY)
  } else if (_.isObject(val)) {
    return new Observer(val, OBJECT)
  }
}
