/**
 * 指令构造函数
 * @param {string} name 值为"text", 代表是文本节点
 * @param {HTML Element} tDom 对应的DOM元素
 * @param {Yue} vm  yue实例
 * @param {String} expression 指令表达式，例如 [Province](expression[0].expression[1])
 * @constructor
 */

function Directive(name, tDom, vm, expression) {
  this.name = name
  this.tDom = tDom
  this.vm = vm
  this.expression = expression
  this.attr = 'nodeValue'

  this.update()
}

Directive.prototype.update = function () {
  this.tDom[this.attr] = this.vm.$data[this.expression]
  console.log(`更新了DOM-${this.expression}`)
}

export default Directive
