import Yue from '../src/index'
// require('../src/index')

const app = new Yue({
  el: '#app',
  data: {
    name: 'Seant',
    age: 26,
    address: {
      city: '南京',
      country: '中国'
    }
  }
})

app.$watch('name', function (val) {
  console.log('我watch住了name')
  console.log(`新的name为${val}`)
})

window.app = app //为了在console中调试方便