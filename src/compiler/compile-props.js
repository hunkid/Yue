/**
 * @author Seant
 * @data 17/6/26
 */

import * as _ from '../util'
import Directive from '../directive'
import {compileGetter} from '../parse/expression'

/**
 * 解析props参数，涵盖动态和静态属性
 * @param {HTML ELEMENT} el 组件节点，如<my-component :name="user.name"></my-component>
 * @param {Array} propOptions Vue.extend传进的prop对象参数，如['name','message]
 * @return {Array} 解析之后的props数组
 *                 如：[
 *                      {
 *                        "name":"name",     // 组件属性名
 *                        "options":{},      // 原先Vue.extend传过来的属性对应的参数, 暂时未空, 之后会放一些参数校验之类的
 *                        "raw":"user.name", // 属性对应的值
 *                        "dynamic":true,    // true代表是动态属性,也就是从父实例/组件那里获取值
 *                        "parentPath":"user.name"   // 属性值在父实例/组件中的路径
 *                      },
 *                      {
 *                        "name":"message",
 *                        "options":{},
 *                        "raw":"How are you?"
 *                      } 
 *                    ]
 */
export function compileProps(el, propOptions) {
  let props = []
  propOptions.forEach((name) => {
    let options = {}
    let prop = {
      name,
      options, // 此处options是为了props验证，这里并没有做，所以为空{}
      raw: null
    }

    let value

    if ((value = _.getBindAttr(el, name))) {
      prop.raw = value
      prop.dynamic = true
      prop.parentPath = value
    } else if ((value = _.getAttr(el, name))) {
      prop.raw = value
    }
    props.push(prop)
  })
  return props
}

export function applyProps (props) {
  props.forEach((prop) => {
    if (prop.dynamic) {
      let dirs = this.$parent._directives
      dirs.push(
        new Directive('prop', null, this, {
          expression: prop.raw,
          arg: prop.name
        })
      )
    } else {
      this.initProp(prop.name, prop.raw, prop.dynamic)
    }
  })
}

export function initProp(path, val, dynamic) {
  if (!dynamic) {
    this.$data[path] = val
  } else {
    this.$data[path] = compileGetter(val)(this.$parent.$data)
  }
}