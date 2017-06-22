export function update () {
  let properties = this.expression.split('.')
  let value = this.vm.$data
  properties.forEach((property) => {
    value = value[property]
  })
  this.tDom['nodeValue'] = value
  console.log(`更新了DOM-${this.expression}`, value)
}