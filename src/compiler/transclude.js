/**
 * Created by Seant on 17/6/23
 */
/**
 * 将template模板转化成DOM结构
 * @param {Element} el
 * @param {Object} options
 */
export default function (el, options) {
  let tpl = options.template
  if (tpl) {
    var parser = new DOMParser()
    var doc = parser.parseFromString(tpl, 'application/xml')
    // 此处生成的doc是一个fragment, 不能直接返回处理
    // 目前只处理了template有唯一根节点的情况, 所以返回firstChild
    // 对于DOM片段的情况, 暂未处理
    return doc.firstChild
  } else {
    return el
  }
}