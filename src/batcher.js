import * as _ from './util'

/**
 * 用于维持一个任务队列
 * 用于在下一个事件循环中异步执行
 * Created by Seant
 *  17/6/14
 */
/**
 * @constructor
 */
export function Batcher() {
  this._preFlush = null
  this.reset()
}

var p = Batcher.prototype

p.reset = function() {
  this.has = {}
  this.queue = []
  this.waiting = false
}

/**
 * 将一个任务推入任务队列
 * @param {Object} job
 *   properties:
 *   - {String | Number} id
 *   - {Boolean}         override
 *   - {Function}        run
 */
p.push = function(job) {
  if (!this.has[job.id]) { // !job.id
    this.has[job.id] = job
    this.queue.push(job)
    if (!this.waiting) {
      this.waiting = true
      setTimeout(() => {
        // isFlushing, 此字段用来处理多重异步队列的问题
        this.isFlushing = true
        this.flush()
        this.isFlushing = false
      })
    }
  }
}

/**
 * 执行并清空事件队列
 */
p.flush = function() {
  this.queue.forEach((job) => {
    job.run()
  })
  this.reset()
}
