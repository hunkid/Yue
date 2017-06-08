/**
 * Created by Seant
 *  17/6/8
 */

var arrayAugmentations = Object.create(Array.prototype)

;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach((method) => {
  var original = Array.prototype[method]
  arrayAugmentations[method] = function() {
    console.log('这个数组被改变')
    return original.apply(this, arguments)
  }
})

export default arrayAugmentations