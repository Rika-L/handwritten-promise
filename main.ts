class MyPromise {
  // 三个状态常量
  static PENDING = 'pending' as const
  static FULFILLED = 'fulfilled' as const
  static REJECTED = 'rejected' as const
  status: 'pending' | 'fulfilled' | 'rejected'
  result: any
  constructor(fn: Function) {
    this.status = MyPromise.PENDING
    this.result = null
    fn(this.resolve.bind(this), this.reject.bind(this))
  }
  resolve(value: any) {
    // 判断当前状态
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED
      this.result = value
    }
  }
  reject(reason: any) {
    // 判断当前状态
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED
      this.result = reason
    }

  }
}

// 测试
const p = new MyPromise((resolve: (value: any) => void, reject: (reason: any) => void) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})

