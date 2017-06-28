export function update (value) {
  this.tDom['nodeValue'] = value
  console.log(`更新了DOM-${this.expression}`, value)
}