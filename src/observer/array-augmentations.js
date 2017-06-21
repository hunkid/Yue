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
    let result = original.apply(this, arguments)
    let ob = this.$observer
    var removed, inserted, index
    switch (method) {
    case 'push':
      break
    case 'pop':
      removed = [result]
      index = this.length
      break
    default:
      return
    }
    ob,notify('set', null, this.length)
  }
})

export default arrayAugmentations