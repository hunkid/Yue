/**
 * created by Seant
 *  2017.6.1
 */

/**
 * Mix properties into target object.
 *
 * @param {Object} to
 * @param {Object} from
 */

export function mixin (to, from) {
  for (var key in from) {
    if (to[key] !== from[key]) {
      to[key] = from[key]
    }
  }
}

/**
 * Mixin including non-enumerables, and copy property descriptors.
 *
 * @param {Object} to
 * @param {Object} from
 */

export function deepMixin (to, from) {
  Object.getOwnPropertyNames(from).forEach(function (key) {
    var descriptor = Object.getOwnPropertyDescriptor(from, key)
    Object.defineProperty(to, key, descriptor)
  })
}

/**
 * Proxy a property on one object to another.
 *
 * @param {Object} to
 * @param {Object} from
 * @param {String} key
 */

export function proxy (to, from, key) {
  if (to.hasOwnProperty(key)) return
  Object.defineProperty(to, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      return from[key]
    },
    set: function (val) {
      from[key] = val
    }
  })
}

/**
 * Object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */

export function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * Array type check.
 *
 * @param {*} obj
 * @return {Boolean}
 */

export function isArray (obj) {
  return Array.isArray(obj)
}

/**
 * Define a non-enumerable property
 *
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 * @param {Boolean} [enumerable]
 */

export function define (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value        : val,
    enumerable   : !!enumerable,
    writable     : true,
    configurable : true
  })
}

/**
 * Augment an target Object or Array by either
 * intercepting the prototype chain using __proto__,
 * or copy over property descriptors
 *
 * @param {Object|Array} target
 * @param {Object} proto
 */

export function augment (target, proto) { //TODO:
    if ('__proto__' in {}) {
        target.__proto__ = proto
    } else {
        deepMixin.apply(target, arguments)
    }
}