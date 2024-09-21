function isFn(fn) {
    return typeof fn === 'function';
}
var MyPromise = /** @class */ (function () {
    function MyPromise(fn) {
        this.status = MyPromise.PENDING;
        this.result = null;
        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        }
        catch (e) {
            this.reject(e);
        }
    }
    MyPromise.prototype.resolve = function (value) {
        // 判断当前状态
        if (this.status === MyPromise.PENDING) {
            this.status = MyPromise.FULFILLED;
            this.result = value;
        }
    };
    MyPromise.prototype.reject = function (reason) {
        // 判断当前状态
        if (this.status === MyPromise.PENDING) {
            this.status = MyPromise.REJECTED;
            this.result = reason;
        }
    };
    MyPromise.prototype.then = function (onFulfilled, onRejected) {
        onFulfilled = isFn(onFulfilled) ? onFulfilled : function () { };
        onRejected = isFn(onRejected) ? onRejected : function () { };
        if (this.status === MyPromise.FULFILLED) {
            onFulfilled(this.result);
        }
        if (this.status === MyPromise.REJECTED) {
            onRejected(this.result);
        }
    };
    // 三个状态常量
    MyPromise.PENDING = 'pending';
    MyPromise.FULFILLED = 'fulfilled';
    MyPromise.REJECTED = 'rejected';
    return MyPromise;
}());
// 测试
var p = new MyPromise(function (resolve, reject) {
    resolve('success');
});
p.then(undefined, function (reason) {
    console.log(reason);
});
