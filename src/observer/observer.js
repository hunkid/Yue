import objectAgumentations from './object-augmentations'
import _ from '../util'

const ARRAY = 0
const OBJECT = 1

/**
 * Observer构造函数
 * @constructor
 * @param {Array|Object} value
 * @param {Number} type
 */

function Observer (value, type) {
  this.value = value
  this.type = type
  if (value) {
    _.define(value, '$observer', this)
    if (type === ARRAY) {
      //TODO:
    } else if (type === OBJECT) {
      
    }
  }
}