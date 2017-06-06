import * as _ from '../util'

var objectAugmentations = {}

_.define(objectAugmentations, '$add', function (key, val) {
  if (this.hasOwnProperty(key)) return
  _.define(this, key, val, true)
  var ob = this.$observer
  ob.observe(key, val)
  ob.convert(key, val)
  ob.notify('add', key, val)
})

_.define(objectAugmentations, '$delete', function (key) {
  if (!this.hasOwnProperty(key)) return
  delete this[key]
  this.$observer.notify('deleted', key)
})

export default objectAugmentations