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

export function _compile() {
  if (this._blockNodes) { // _blockNodes指？
    this._blockNodes.forEach(this._compileNode, this)
  } else {
    this._compileNode(this.$el)
  }
}

export function _compileElement(node) {
  if (node.hasChildNodes()) {
    Array.from(node.childNodes).forEach(this._compileNode, this)
  }
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
  node.nodeValue = nodeValue
}

export function _compileComment(node) {
}

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
