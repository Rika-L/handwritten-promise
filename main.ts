function isFn(fn: any): fn is Function {
  return typeof fn === 'function'
}

class MyPromise {
  // 三个状态常量
  static PENDING = 'pending' as const
  static FULFILLED = 'fulfilled' as const
  static REJECTED = 'rejected' as const
  status: 'pending' | 'fulfilled' | 'rejected'
  result: any
  resolveCbs: Function[]
  rejectCbs: Function[]
  constructor(fn: Function) {
    this.status = MyPromise.PENDING
    this.result = null
    this.resolveCbs = []
    this.rejectCbs = []
    try {
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      this.reject(e)
    }
  }

  resolve(value: any) {
    setTimeout(() => {
      // 判断当前状态
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.FULFILLED
        this.result = value
        this.resolveCbs.forEach(cb => {
          cb(value)
        })
      }
    })
  }

  reject(reason: any) {
    setTimeout(() => {
      // 判断当前状态
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.REJECTED
        this.result = reason
        this.resolveCbs.forEach(cb => {
          cb(reason)
        })
      }
    })
  }

  then(onFulfilled: any, onRejected: any) {
    return new MyPromise((_resolve: (value: any) => void, _reject: (reason: any) => void) => {
      onFulfilled = isFn(onFulfilled) ? onFulfilled : () => { }
      onRejected = isFn(onRejected) ? onRejected : () => { }
      if (this.status === MyPromise.PENDING) {
        this.resolveCbs.push(onFulfilled)
        this.rejectCbs.push(onRejected)
      }
      if (this.status === MyPromise.FULFILLED) {
        setTimeout(() => {
          onFulfilled(this.result)
        })
      }
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          onRejected(this.result)
        })
      }
    })
  }
}

// 测试
const p = new MyPromise((resolve: (value: any) => void, reject: (reason: any) => void) => {
  resolve('success')
})

p.then(undefined, (reason: any) => {
  console.log(reason)
})

