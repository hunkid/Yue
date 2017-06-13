export function update () {
  let properties = this.expression.split('.')
  let value = this.vm.$data
  properties.forEach((property) => {
    value = value[property]
  })
  this.tDom[this.attr] = value
  console.log(`更新了DOM-${this.expression}`, value)
}