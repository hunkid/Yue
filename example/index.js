import Yue from '../src/index'
// require('../src/index')

const app = new Yue({
  el: '#app',
  data: {
    name: 'Seant',
    age: 26,
    user: {
      name: 'Seant',
      age: 26
    }
  }
})

app.$watch('user.name', function (val) {
  console.log('我watch住了user.name')
})

window.app = app //为了在console中调试方便