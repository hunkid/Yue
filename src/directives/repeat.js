/**
 * Created by Seant on 17/6/21
 */

import config from '../config'
import * as _ from '../util'
import Yue from '../index'


// 用唯一的uid来区分不同的repeat实例
let uid = 0

export default {
  bind () {
    this.id = `__y_repeat_${++uid}`
    this.ref = document.createComment(`${config.prefix}repeat`)
    _.replace(this.tDom, this.ref)
  },
  update (data) {
    if (data && !Array.isArray(data)) {
      console.warn(`Invalid value for b-repeat:${data}\nExpects Array`)
      return
    }
    this.vms = this.diff(
      data || [],
      this.vms
    )
  },
  diff (data, oldVms) {
    let vms = new Array(data.length)
    let ref = this.ref
    // 首先遍历新数组
    // 若实例是可复用的，在旧的实例上打_reused标签
    // 否则新建这个实例
    data.forEach((obj, i) => {
      let vm = this.getVm(obj)
      if (vm) {
        vm._reused = true
      } else {
        vm = this.build(obj, i)
      }
      vms[i] = vm

      //oldVms为false，所以初始化
      if (!oldVms) {
        vm.$before(ref)
      }
    })
    // 如果第一次执行diff，即初始化，那么程序到此为止
    if (!oldVms) {
      return vms
    }

    //第二步，遍历旧的实例数组，删除那些没有被打上_reused标签的实例
    oldVms.forEach((oldVm) => {
      if (oldVm.reused) {
        return
      }
      oldVm.$remove()
    })

    // 第三步，移动或者插入新的实例到正确位置
    for (let l = vms.length - 1; l >= 0; l--) {
      let vm = vms[l]
      let targetNext = vms[l + 1]
      if (!targetNext) {
        // 最后一个实例
        vm.$before(ref)
      } else {
        if (vm._reused) {
          // 可复用实例
          // 如果当前下一个兄弟节点不是目标顺序中的兄弟节点
          // 重新移动排序
          if (targetNext !== vm.$el.nextSibling) {
            vm.$before(targetNext.$el)
          } else {
            vm.$before(targetNext)
          }
        }
      }
    }
  },
  build (data, index) {
    let vm = new Yue({
      el: this.tDom.cloneNode(true),
      data: data,
      parent: this.vm
    })
    this.cacheVm(data, vm)
    return vm
  },
  getVm (data) {
    return data[this.id]
  },
  cacheVm (data, vm) {
    data[this.id] = vm
  }
}