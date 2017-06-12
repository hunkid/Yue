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