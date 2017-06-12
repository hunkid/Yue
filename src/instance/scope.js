import Observer from '../observer/observer'

/**
 * @param {Object} data VM.$data
 */
export function _initData(data) {
  this.observer = Observer.create(data)
}