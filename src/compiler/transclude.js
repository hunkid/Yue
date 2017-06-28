/**
 * Created by Seant on 17/6/23
 */
/**
 * 将template模板转化成DOM结构
 * @param {Element} el
 * @param {Object} options
 */
export default function transclude (el, options) {
  let tpl = options.template
  if (tpl) {
    let ret = document.querySelector(options.template)
    if (ret) {
      return ret.content.children[0] // 这里是取<template></template>以内的东西
    }
    var parser = new DOMParser()
    var doc = parser.parseFromString(tpl, 'text/html')
    // 此处生成的doc是一个fragment, 不能直接返回处理
    // 目前只处理了template有唯一根节点的情况, 所以返回firstChild
    // 对于DOM片段的情况, 暂未处理
    return doc.querySelector('body').firstChild
  } else {
    return el
  }
}