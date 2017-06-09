/**
 * Created by Seant
 *  17/6/5
 */

/**
 * The main entrance to the compilation process.
 * Calling this function requires the instance's `$el` to
 * be already set up, and it should be called only once
 * during an instance's entire lifecycle.
 */
import Directive from '../directive'
var fragment, currentNodeList = []

export function _compile() {
  // fragment = document.createDocumentFragment()
  // currentNodeList.push(fragment)
  // this._compileNode(this.$template)
  // this.$el.parentNode.replaceChild(fragment, this.$el)
  // this.$el = document.querySelector(this.$options.el)
  this._compileNode(this.$el)
}

export function _compileElement(node) {
  if (node.hasChildNodes()) {
    Array.from(node.childNodes).forEach(
      (cnode) => {
        this._compileNode(cnode)
      }, this)
  }
}

export function _compileTextNode(node) {
  var nodeValue = node.nodeValue
  if (nodeValue === '') return
  var pat = /{{\w+(.\w+)*}}/g
  var ret = nodeValue.match(pat)
  if (!ret) return
  ret.forEach((expression) => {
    let newDom = document.createTextNode('')
    node.parentNode.insertBefore(newDom, node)

    let property = expression.replace(/[{}]/g, '') // 去除{}
    // let props = property.split('.')
    this._bindDirective('text', newDom, property)

  }, this)
  
  node.parentNode.removeChild(node)
}

export function _compileComment(node) {}

export function _compileNode(node) {
  switch (node.nodeType) {
  case 1: // element
    if (node.tagName !== 'SCRIPT') {
      this._compileElement(node)
    }
    break
  case 3: // text
    this._compileTextNode(node)
    break
  case 8: // comment
    this._compileComment(node)
    break
  }
}

export function _bindDirective(name, node, expression) {
  this._directives.push(
    new Directive(name, node, this, expression)
  )
}