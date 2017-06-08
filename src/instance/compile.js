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

var fragment, currentNodeList = []

export function _compile() {
  fragment = document.createDocumentFragment()
  currentNodeList.push(fragment)
  this._compileNode(this.$template)
  this.$el.parentNode.replaceChild(fragment, this.$el)
  this.$el = document.querySelector(this.$options.el)
}

export function _compileElement(node) {
  var newNode = document.createElement(node.tagName)

  if (node.hasAttributes()) {
    var attrs = node.attributes
    Array.from(attrs).forEach((attr) => {
      newNode.setAttribute(attr.name, attr.value)
    })
  }

  currentNodeList[currentNodeList.length - 1].appendChild(newNode)
  
  if (node.hasChildNodes()) {
    currentNodeList.push(newNode)
    Array.from(node.childNodes).forEach(this._compileNode, this)
  }

  currentNodeList.pop()
}

export function _compileTextNode(node) {
  var nodeValue = node.nodeValue
  if (nodeValue === '') return
  var pat = /{{\w+(.\w+)*}}/g
  var ret = nodeValue.match(pat)
  if (!ret) return
  ret.forEach((val) => {
    let property = val.replace(/[{}]/g, '') // 去除{}
    let props = property.split('.')
    let newV = this.$data[props[0]]
    for (let k = 1, n = props.length; k < n; k++) {
      newV = newV[props[k]]
    }
    nodeValue = nodeValue.replace(val, newV)
  }, this)
  currentNodeList[currentNodeList.length - 1].appendChild(document.createTextNode(nodeValue))
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