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
import * as textParser from '../parse/text'
import * as dirParser from '../parse/directive'
import * as _ from '../util'

var fragment, currentNodeList = []

export function _compile() {
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
  let tokens = textParser.parse(node.nodeValue)
  if (!tokens) return

  tokens.forEach((token) => {
    if (token.tag) {
      // 指令节点
      let value = token.value
      let el = document.createTextNode('')
      _.before(el, node)
      this._bindDirective('text', value, el) // 这里便是将指令节点和其对应的value值联系起来，如value:usr.name
    } else {
      // 普通文本节点
      let el = document.createTextNode(token.value)
      _.before(el, node)
    }
  })

  _.remove(node)
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

export function _bindDirective(name, value, node) {
  let descriptors = dirParser.parse(value)
  let dirs = this._directives
  descriptors.forEach((descriptor) => {
    dirs.push(
      new Directive(name, node, this, descriptor)
    )
  })
}