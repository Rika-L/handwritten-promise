function isFn(fn) {
    return typeof fn === 'function';
}
var MyPromise = /** @class */ (function () {
    function MyPromise(fn) {
        this.status = MyPromise.PENDING;
        this.result = null;
        this.resolveCbs = [];
        this.rejectCbs = [];
        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        }
        catch (e) {
            this.reject(e);
        }
    }
    MyPromise.prototype.resolve = function (value) {
        var _this = this;
        setTimeout(function () {
            // 判断当前状态
            if (_this.status === MyPromise.PENDING) {
                _this.status = MyPromise.FULFILLED;
                _this.result = value;
                _this.resolveCbs.forEach(function (cb) {
                    cb(value);
                });
            }
        });
    };
    MyPromise.prototype.reject = function (reason) {
        var _this = this;
        setTimeout(function () {
            // 判断当前状态
            if (_this.status === MyPromise.PENDING) {
                _this.status = MyPromise.REJECTED;
                _this.result = reason;
                _this.resolveCbs.forEach(function (cb) {
                    cb(reason);
                });
            }
        });
    };
    MyPromise.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        return new MyPromise(function (_resolve, _reject) {
            onFulfilled = isFn(onFulfilled) ? onFulfilled : function () { };
            onRejected = isFn(onRejected) ? onRejected : function () { };
            if (_this.status === MyPromise.PENDING) {
                _this.resolveCbs.push(onFulfilled);
                _this.rejectCbs.push(onRejected);
            }
            if (_this.status === MyPromise.FULFILLED) {
                setTimeout(function () {
                    onFulfilled(_this.result);
                });
            }
            if (_this.status === MyPromise.REJECTED) {
                setTimeout(function () {
                    onRejected(_this.result);
                });
            }
        });
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
