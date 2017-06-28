import Yue from '../src/index'


const app = new Yue({
  el: '#app',
  data: {
    user: {
      name: 'Seant',
      age: 26
    },
    message: {
      name: ''
    },
    show: true,
    list: {
      items: [{
        title: 'aaa'
      },
      {
        title: 'bbb'
      },
      {
        title: 'ccc'
      }
      ]
    }
  },
  computed: {
    info: function() {
      return `计算出来属性->姓名：${this.user.name}`
    }
  },
  methods: {
    submit: function() {
      console.log('提交')
    }
  }
})

window.app = app //为了在console中调试方便