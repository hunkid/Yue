import Yue from '../src/index'

var MyComponent = Yue.extend({
  template: '<p>{{message}}</p>'
})

Yue.component('my-component', MyComponent)

const app = new Yue({
  el: '#app',
  data: {
    message: 'hello'
  }
})

window.app = app //为了在console中调试方便
