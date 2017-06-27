/**
 * Created by Seant
 *  17/6/6
 */
import Watcher from '../watcher'
/**
 * @param {String} exp
 * @param {Function} cb
 */

export function $watch(exp, cb) {
  new Watcher(this, exp, cb, this)
}

export function $set(exp, val) {
  let ee = exp.split('.')
  let length = ee.length
  let data = this.$data
  for (let i = 0; i < length - 1; i++) {
    let key = ee[i]
    data = data[key]
  }
  data[ee[length - 1]] = val
}