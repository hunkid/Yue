import Yue from '../src/index'
// require('../src/index')

new Yue({
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