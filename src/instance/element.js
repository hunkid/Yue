export function _initElement(el) {
  if (typeof el === 'string') {
    let selector = el
    this.$el = el = document.querySelector(el)
    if (!el) {
      console.warn(`Cannot find element: ${selector}`)
    }
  } else {
    this.$el = el
  }
}