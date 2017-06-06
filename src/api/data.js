/**
 * Created by Seant
 *  17/6/6
 */

/**
 * @param {String} exp
 * @param {Function} cb
 */

export function $watch(exp, cb) {
  var _fn = function () {
    cb.apply(this, [].slice.call(arguments, 2))
  }
  this.$data.$observer.on(`set:${exp}`, _fn)
}