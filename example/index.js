import Yue from '../src/index'

var MyComponent = Yue.extend({
  template: '<div>' +
    '<p>Hello, {{name}}</p>' +
    '<p>{{message}}</p>' +
    '</div>',
  props: ['name', 'message']
})

Yue.component('my-component', MyComponent)

const app = new Yue({
  el: '#app',
  data: {
    user: {
      name1: '木易',
      name2: 'Seant'
    }
  }
})

window.app = app //为了在console中调试方便