export function _initElement(el) {
  if (typeof el !== 'string') return
  let selector = el
  this.$el = document.querySelector(el)
  if (!el) {
    console.warn(`Cannot find element: ${selector}`)
  }
}