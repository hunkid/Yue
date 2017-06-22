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
import config from '../config'

var fragment, currentNodeList = []

const priorityDirs = [
  'if',
  'repeat'
]

export function _compile() {
  this._compileNode(this.$el)
}

export function _compileElement(node) {
  let hasAttributes = node.hasAttributes()
  
  if (hasAttributes && this._checkPriorityDirs(node)) {
    return
  }

  if(hasAttributes) {
    this._compileAttrs(node)
  }

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

/**
 * 循环解析属性(包括特殊属性和普通属性)
 * @param {HTML Element} node
 * @private
 */
export function _compileAttrs(node) {
  let attrs = Array.from(node.attributes)
  let registry = this.$options.directives
  attrs.forEach((attr) => {
    let attrName = attr.name
    let attrValue = attr.value
    if (attrName.indexOf(config.prefix) === 0) {
      // 特殊属性 如: v-on:"submit"
      let dirName = attrName.slice(config.prefix.length)
      if (!registry[dirName]) return
      this._bindDirective(dirName, attrValue, node)
    } else {
      // 普通属性 如: data-id="{{user.id}}"
      this._bindAttr(node, attr)
    }
  })
}

/**
 * @param node {Element}
 * @param attr {Object} 如 {name:"data-id", id:"app"}
 * @private
 */
export function _bindAttr(node, attr) {
  let {name, value} = attr
  let tokens = textParser.parse(value)
  if (!tokens) return
  this._bindDirective('attr', `${name}:${tokens[0].value}`, node)
}


/**
 * 检测node节点是否包含"v-if"这样的高优先级指令
 * 若，包含则不遍历，直接指令绑定
 * @param {HTML Elment} node 
 */
export function _checkPriorityDirs(node) {
  for (let i = 0, length = priorityDirs.length; i < length; i++) {
    let dir = priorityDirs[i]
    let value = _.attr(node, dir)
    if (value) {
      this._bindDirective(dir, value, node)
      return true
    }
  }
}