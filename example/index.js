import Yue from '../src/index'
// require('../src/index')

const app = new Yue({
  el: '#app',
  data: {
    show: true,
    name: 'Seant',
    age: 26,
    user: {
      name: 'Seant',
      age: 26
    },
    list: {
      items: [{
        title: 'aaa'
      },
      {
        title: 'bbb'
      },
      {
        title: 'ccc'
      }]
    }
  },
  computed: {
    info() {
      return `得到了${this.user.name}和${this.user.age}`
    }
  }
})

window.app = app //为了在console中调试方便