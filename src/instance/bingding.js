
export function _updateBindingAt() {
  let path = arguments[1]
  this._directives.forEach((directive) => {
    if (directive.expression !== path) return
    directive.update()
  })
}