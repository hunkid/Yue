import Yue from '../src/index'

var child = Yue.extend({
  template: '#child-template',
  data: {
    name: '',
    age: ''
  },
  methods: {
    dispatchName: function () {
      this.$dispatch('child-name', this.name)
    },
    broadcastName: function () {
      this.$broadcast('parent-name', this.name)
    }
  },
  events: {
    'child-name': function (name) {
      this.name = name
      return true
    },
    'child-age': function (age) {
      this.age = age
    },
    'parent-name': function (name) {
      this.name = name
      return true
    },
    'parent-age': function (age) {
      this.age = age
    }
  }
})

Yue.component('child', child)

var recursiveChild = Yue.extend({
  template: '#recursive-child-template',
  data: {
    name: '',
    age: ''
  },
  methods: {
    dispatchName: function () {
      this.$dispatch('child-name', this.name)
    },
    dispatchAge: function () {
      this.$dispatch('child-age', this.age)
    }
  },
  events: {
    'parent-name': function (name) {
      this.name = name
    },
    'parent-age': function (age) {
      this.age = age
    }
  }
})

Yue.component('recursive-child', recursiveChild)

const app = new Yue({
  el: '#app',
  data: {
    name: '',
    age: ''
  },
  events: {
    'child-name': function (name) {
      this.name = name
    },
    'child-age': function (age) {
      this.age = age
    }
  },
  methods: {
    broadcastName: function () {
      this.$broadcast('parent-name', this.name)
    },
    broadcastAge: function () {
      this.$broadcast('parent-age', this.age)
    }
  }
})

window.app = app //为了在console中调试方便
