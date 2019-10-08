//commented
//200row is code
var Promise = (function () {
  // resolve 和 reject 都是异步的
  // 因为 executor 中就算执调用行了resolve
  // 仍然要执行完executor之后的代码
  // 这点和throw 的机制不同
  function resolve (value) {
    // 如果value是promise， 则一直展开
    // 直至value为非promise为止
    if (value instanceof Promise) {
      return value.then(resolve.bind(this), reject.bind(this))
    }
    setTimeout(() => {
      if (this.status !== 'pending') return
      this.status = 'resolved'
      this.data = value
      for (let each of this.onResolvedCallback) {
        each(value)
      }
    }, 0)
  }

  function reject (reason) {
    // reject 和resolve 不同，
    // 直接原样将值抛出
    setTimeout(() => {
      if (this.status !== 'pending') return
      this.status = 'rejected'
      this.data = reason
      for (let each of this.onRejectedCallback) {
        each(reason)
      }
    }, 0)
  }

  function resolvePromise (promise, x, resolve, reject) {
    // 如果resolve 返回的是then刚返回的promise，直接报错
    // 因为这相当于链上连续两个相同的promise
    // 具体情况可以看测试代码
    if (promise === x) {
      return reject(new TypeError('Chaining cycle detected for promise!'))
    }

    // 因为我们只能假设它是thenable, 但实际上这个then不知道是什么
    // 所以当then同时调用了 res, rej 的情况下
    // 我们以第一次调用的结果为准， 这也是为什么当
    // thenAlreadyCalledOrThrow 为true 时我们直接返回
    let thenAlreadyCalledOrThrow = false
    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
      try {
        let then = x.then
        if (typeof then === 'function') {
          // 一个非空的对象， 假设它是thenable来保证promise的兼容性
          // 如果有then， 说明他是
          then.call(x, function res (y) {
            if (thenAlreadyCalledOrThrow) return
            thenAlreadyCalledOrThrow = true
            return resolvePromise(promise, y, resolve, reject)
          }, function rej (r) {
            if (thenAlreadyCalledOrThrow) return
            thenAlreadyCalledOrThrow = true
            return reject(r)
          })
        } else {
          // x对象没有then，说明不是，相当于then里面返回了一个
          // 正常的值， 所以直接resolve即可
          resolve(x)
        }
      } catch (e) {
        if (thenAlreadyCalledOrThrow) return
        thenAlreadyCalledOrThrow = true
        return reject(e)
      }
    } else {
      resolve(x)
    }
  }

  function Promise (executor) {
    if (typeof executor !== 'function') {
    // 非标准 但与Chrome谷歌保持一致
      throw new TypeError('Promise resolver ' + executor + ' is not a function')
    }

    this.status = 'pending'
    this.data = undefined
    this.onResolvedCallback = []
    this.onRejectedCallback = []

    // 实现过程中如果出现 Error, 直接reject.
    try {
      executor(resolve.bind(this), reject.bind(this))
    } catch (e) {
      reject.bind(this)(e)
    }
  }

  Promise.prototype.then = function (onfulfilled, onrejected) {
    // 返回值穿透
    if (typeof onfulfilled !== 'function') onfulfilled = data => data
    // 错误穿透， 注意这里要用throw而不是return， 因为如果是return的话
    // 那么这个then返回的promise状态将变成resolved但是我们想要的是rejected
    // 这样才能调用之后的onrejected
    if (typeof onrejected !== 'function') onrejected = reason => { throw reason }

    if (this.status === 'resolved') {
      let thenPromise = new Promise((resolve, reject) => {
        // 使用箭头函数来保证this一直指向原Promise对象
        // 源代码中使用了this
        // then函数返回时promise是同步的， 但执行then回调必须是异步的
        setTimeout(() => {
          try {
            // 这个onfulfilled 就是then的回调函数
            // 无论什么时候他必须异步
            // 当前this.status 是 resolved (rejeted 也一样)
            // 说明此时的event loop已经不是promise状态改变的
            // 那个event loop了，所以此时要想 then代码异步,
            // 必须加上setTimeout
            // 而下面  this.state 是 ‘pending’ 则不同
            // 因为起码在该次event loop之内，promise的状态不会
            // 改变，所以已经确保了这个then起码会在下一个
            // event loop 才被调用， 也就是已经确保了异步
            var x = onfulfilled(this.data)
            resolvePromise(thenPromise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
      return thenPromise
    }
    if (this.status === 'rejected') {
      let thenPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            var x = onrejected(this.data)
            resolvePromise(thenPromise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
      return thenPromise
    }
    if (this.status === 'pending') {
      // 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，而resolve或reject函数里的内容已是异步执行，构造函数里的定义
      // 以上是原解释， 其实是不完整的, 只是解释了为什么没必要添加setTimerout
      // 但是并没有解释为什么添加之后是错的 (不信的可以拿源代码添加之后跑测试)
      // 原因在于， 如果源代码在下一个event loop 完成了， 那么他会立即调用回调，
      // 但是此时回调还没有被push到新的promise上
      let thenPromise = new Promise((resolve, reject) => {
        this.onResolvedCallback.push(() => {
          try {
            var x = onfulfilled(this.data)
            resolvePromise(thenPromise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })

        this.onRejectedCallback.push(() => {
          try {
            var x = onrejected(this.data)
            resolvePromise(thenPromise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
      return thenPromise
    }
  }

  // for prmise A+ test
  Promise.deferred = Promise.defer = function () {
    var dfd = {}
    dfd.promise = new Promise(function (resolve, reject) {
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd
  }

  // for nodejs
  if (typeof module !== 'undefined') {
    module.exports = Promise
  }

  return Promise
})() // IIFE for old browser

// ES6
// export default Promise

//xieran




var Promise = (function() {
  function Promise(resolver) {
    if (typeof resolver !== 'function') {
      throw new TypeError('Promise resolver ' + resolver + ' is not a function')
    }
    if (!(this instanceof Promise)) return new Promise(resolver)

    var self = this
    self.callbacks = []
    self.status = 'pending'

    function resolve(value) {
      setTimeout(function() {
        if (self.status !== 'pending') {
          return
        }
        self.status = 'resolved'
        self.data = value

        for (var i = 0; i < self.callbacks.length; i++) {
          self.callbacks[i].onResolved(value)
        }
      })
    }

    function reject(reason) {
      setTimeout(function(){
        if (self.status !== 'pending') {
          return
        }
        self.status = 'rejected'
        self.data = reason

        for (var i = 0; i < self.callbacks.length; i++) {
          self.callbacks[i].onRejected(reason)
        }
      })
    }

    try{
      resolver(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }

  function resolvePromise(promise, x, resolve, reject) {
    var then
    var thenCalledOrThrow = false

    if (promise === x) {
      return reject(new TypeError('Chaining cycle detected for promise!'))
    }

    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
      try {
        then = x.then
        if (typeof then === 'function') {
          then.call(x, function rs(y) {
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            return resolvePromise(promise, y, resolve, reject)
          }, function rj(r) {
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            return reject(r)
          })
        } else {
          return resolve(x)
        }
      } catch(e) {
        if (thenCalledOrThrow) return
        thenCalledOrThrow = true
        return reject(e)
      }
    } else {
      return resolve(x)
    }
  }

  Promise.prototype.then = function(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : function(v){return v}
    onRejected = typeof onRejected === 'function' ? onRejected : function(r){throw r}
    var self = this
    var promise2

    if (self.status === 'resolved') {
      return promise2 = new Promise(function(resolve, reject) {
        setTimeout(function() {
          try {
            var x = onResolved(self.data)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            return reject(e)
          }
        })
      })
    }

    if (self.status === 'rejected') {
      return promise2 = new Promise(function(resolve, reject) {
        setTimeout(function() {
          try {
            var x = onRejected(self.data)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            return reject(e)
          }
        })
      })
    }

    if (self.status === 'pending') {
      return promise2 = new Promise(function(resolve, reject) {
        self.callbacks.push({
          onResolved: function(value) {
            try {
              var x = onResolved(value)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              return reject(e)
            }
          },
          onRejected: function(reason) {
            try {
              var x = onRejected(reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              return reject(e)
            }
          }
        })
      })
    }
  }

  Promise.prototype.valueOf = function() {
    return this.data
  }

  Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected)
  }

  Promise.prototype.finally = function(fn) {
    // 为什么这里可以呢，因为所有的then调用是一起的，但是这个then里调用fn又异步了一次，所以它总是最后调用的。
    // 当然这里只能保证在已添加的函数里是最后一次，不过这也是必然。
    // 不过看起来比其它的实现要简单以及容易理解的多。
    // 貌似对finally的行为没有一个公认的定义，所以这个实现目前是跟Q保持一致，会返回一个新的Promise而不是原来那个。
    return this.then(function(v){
      setTimeout(fn)
      return v
    }, function(r){
      setTimeout(fn)
      throw r
    })
  }

  Promise.prototype.spread = function(fn, onRejected) {
    return this.then(function(values) {
      return fn.apply(null, values)
    }, onRejected)
  }

  Promise.prototype.inject = function(fn, onRejected) {
    return this.then(function(v) {
      return fn.apply(null, fn.toString().match(/\((.*?)\)/)[1].split(',').map(function(key){
        return v[key];
      }))
    }, onRejected)
  }

  Promise.prototype.delay = function(duration) {
    return this.then(function(value) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(value)
        }, duration)
      })
    }, function(reason) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          reject(reason)
        }, duration)
      })
    })
  }

  Promise.all = function(promises) {
    return new Promise(function(resolve, reject) {
      var resolvedCounter = 0
      var promiseNum = promises.length
      var resolvedValues = new Array(promiseNum)
      for (var i = 0; i < promiseNum; i++) {
        (function(i) {
          Promise.resolve(promises[i]).then(function(value) {
            resolvedCounter++
            resolvedValues[i] = value
            if (resolvedCounter == promiseNum) {
              return resolve(resolvedValues)
            }
          }, function(reason) {
            return reject(reason)
          })
        })(i)
      }
    })
  }

  Promise.race = function(promises) {
    return new Promise(function(resolve, reject) {
      for (var i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(function(value) {
          return resolve(value)
        }, function(reason) {
          return reject(reason)
        })
      }
    })
  }

  Promise.resolve = function(value) {
    var promise = new Promise(function(resolve, reject) {
      resolvePromise(promise, value, resolve, reject)
    })
    return promise
  }

  Promise.reject = function(reason) {
    return new Promise(function(resolve, reject) {
      reject(reason)
    })
  }

  Promise.fcall = function(fn){
    // 虽然fn可以接收到上一层then里传来的参数，但是其实是undefined，所以跟没有是一样的，因为resolve没参数啊
    return Promise.resolve().then(fn)
  }

  Promise.done = Promise.stop = function(){
    return new Promise(function(){})
  }

  Promise.deferred = Promise.defer = function() {
    var dfd = {}
    dfd.promise = new Promise(function(resolve, reject) {
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd
  }

  try { // CommonJS compliance
    module.exports = Promise
  } catch(e) {}

  return Promise
})()

/*
Promise.resolve(promise);	返回 promise（仅当 promise.constructor == Promise 时）
Promise.resolve(thenable);	从 thenable 中生成一个新 promise。 thenable 是具有 `then()` 方法的类似于 promise 的对象。
Promise.resolve(obj);	在此情况下，生成一个 promise 并在执行时返回 obj 。
Promise.reject(obj);	生成一个 promise 并在拒绝时返回 obj。 为保持一致和调试（例如 堆叠追踪），obj 应为 instanceof Error。
Promise.all(array);	生成一个 promise，该 promise 在数组中各项执行时执行，在任意一项拒绝时拒绝。 每个数组项均传递给 Promise.resolve，因此数组可能混合了类似于 promise 的对象和其他对象。 执行值是一组有序的执行值。 拒绝值是第一个拒绝值。
Promise.race(array);	生成一个 Promise，该 Promise 在任意项执行时执行，或在任意项拒绝时拒绝，以最先发生的为准。



new Promise(function(resolve, reject) {});	
resolve(thenable)
Promise 依据 thenable 的结果而执行/拒绝

resolve(obj)
promise 执行并返回 obj

reject(obj)
promise 拒绝并返回 obj。 为保持一致和调试（例如堆叠追踪），obj 应为 instanceof Error。 在构造函数回调中引发的任何错误将隐式传递给 reject()。

promise.then(onFulfilled, onRejected)	当/如果“promise”解析，则调用 onFulfilled。 当/如果“promise”拒绝，则调用 onRejected。 两者均可选，如果任意一个或两者都被忽略，则调用链中的下一个 onFulfilled/onRejected。 两个回调都只有一个参数：执行值或拒绝原因。 then() 将返回一个新 promise，它相当于从 onFulfilled/onRejected 返回的值 （通过 Promise.resolve 传递之后）。 如果在回调中引发了错误，返回的 promise 将拒绝并返回该错误。
promise.catch(onRejected)	对 promise.then(undefined, onRejected)
*/