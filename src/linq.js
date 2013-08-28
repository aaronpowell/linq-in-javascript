(function (global) {
    'use strict';

    var __extends = function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        __.prototype = b.prototype;
        d.prototype = new __();
    };

    var fnTrue = () => true;


    var Enumerable = function (array) {
        if (typeof this === 'undefined' || this.constructor !== Enumerable) {
            return new Enumerable(array);
        }
        this._array = array;
    };

    var where = function(fn) {
        return new WhereEnumerable(this, fn);
    };

    var select = function(fn) {
        return new SelectEnumerable(this, fn);
    };

    var first = function (nullable, selector) {
        return function (fn) {
            fn = fn || selector;
            for (let item in this) {
                if (fn(item)) {
                    return item;
                }
            }

            if (nullable) {
                return undefined;
            }
            throw 'Sequence contains no matching elements';
        };
    };

    var single = function (nullable, selector) {
        return function (fn) {
            fn = fn || selector;
            var matched;
            for (let item in this) {
                if (fn(item)) {
                    if (matched) {
                        throw 'Sequence contains more than one matching element';
                    }
                    else {
                        matched = item;
                    }
                }
            }

            if (matched) {
                return matched;
            }

            if (!matched && nullable) {
                return undefined;
            }

            throw 'Sequence contains no matching elements';
        };
    };

    var all = function (fn) {
        for (let x in this) {
            if (!fn(x)) {
                return false;
            }
        }

        return true;
    };

    var any = function (fn) {
        fn = fn || fnTrue;

        for (let x in this) {
            if (fn(x)) {
                return true;
            }
        }
        return false;
    }

    var count = function (fn) {
        fn = fn || fnTrue;

        var count = 0;
        for (var i in this) {
            if (fn(i)) {
                count++;
            }
        }
        return count;
    };

    var take = function (count) {
        return new TakeEnumerable(this, count || 0);
    };

    var takeWhile = function (fn) {
        return new TakeEnumerable(this, fn || 0);
    };

    var skip = function (count) {
        return new SkipEnumerable(this, count || 0);
    };

    var skipWhile = function (fn) {
        return new SkipEnumerable(this, fn || 0);
    };

    var __iterator__ = function() {
        for (var i = 0; i < this._array.length; i++) {
            yield this._array[i]
        };
    };

    var toArray = function() {
        var arr = [];
        for (var i in this) {
            arr.push(i);
        }
        return arr;
    };

    Enumerable.prototype.where = where;
    Enumerable.prototype.filter = where;

    Enumerable.prototype.select = select;
    Enumerable.prototype.map = select;

    Enumerable.prototype.first = first(false, fnTrue);
    Enumerable.prototype.firstOrDefault = first(true, fnTrue);

    Enumerable.prototype.single = single(false, fnTrue);
    Enumerable.prototype.singleOrDefault = single(true, fnTrue);

    Enumerable.prototype.all = all;
    Enumerable.prototype.any = any;
    Enumerable.prototype.count = count;

    Enumerable.prototype.take = take;
    Enumerable.prototype.takeWhile = takeWhile;

    Enumerable.prototype.skip = skip;
    Enumerable.prototype.skipWhile = skipWhile;

    Enumerable.prototype.__iterator__ = __iterator__;
    Enumerable.prototype.toArray = toArray;

    var WhereEnumerable = (function (__super) {
        __extends(WhereEnumerable, __super);

        function WhereEnumerable(enumerable, fn) {
            __super.call(this, enumerable._array);
            this._enumerable = enumerable;
            this._fn = fn;
        };

        WhereEnumerable.prototype.__iterator__ = function() {
            var arr = [];

             var index = 0;
            for (var item in this._enumerable) {
                if (this._fn(item, index)) {
                    arr.push(item);
                    yield item;
                }
                index++;
            }

            this._enumerable = new Enumerable(arr);
        };

        return WhereEnumerable;
    })(Enumerable);

    var SelectEnumerable = (function (__super) {
        __extends(SelectEnumerable, __super);
    
        function SelectEnumerable(enumerable, fn) {
            __super.call(this, enumerable._array);
            this._enumerable = enumerable;
            this._fn = fn;
        };

        SelectEnumerable.prototype.__iterator__ = function () {
            var arr = [];

            var index = 0;
            for (var item in this._enumerable) {
                let x = this._fn(item, index++);
                arr.push(x);
                yield x;
            }
        };

        return SelectEnumerable;
    })(Enumerable);

    var RangeEnumerable = (function (__super) {
        __extends(RangeEnumerable, __super);

        function RangeEnumerable(enumerable, start, end) {
            __super.call(this, enumerable._array);
            this._start = start;
            this._end = end;
        };
        RangeEnumerable.prototype.__iterator__ = function () {
            for (var i = this._start; i <= this._end; i++) {
                yield i;
            }
        };

        return RangeEnumerable;
    })(Enumerable);

    var TakeEnumerable = (function (__super) {
        __extends(TakeEnumerable, __super);

        function TakeEnumerable(enumerable, selector) {
            __super.call(this, enumerable._array);
            this._enumerable = enumerable;
            this._selector = selector;
        }

        TakeEnumerable.prototype.__iterator__ = function () {
            var index = 0;
            if (typeof this._selector === 'number') {
                for (let item in this._enumerable) {
                    if (index < this._selector) {
                        yield item;
                        index++;
                    } else {
                        break;
                    }
                }
            } else if (typeof this._selector === 'function') {
                for (let item in this._enumerable) {
                    if (this._selector(item, index)) {
                        yield item;
                    } else {
                        break;
                    }
                    index++;
                }
            }
        };

        return TakeEnumerable;
    })(Enumerable);

    var SkipEnumerable = (function (__super) {
        __extends(SkipEnumerable, __super);

        function SkipEnumerable(enumerable, selector) {
            __super.call(this, enumerable._array);
            this._enumerable = enumerable;
            this._selector = selector;
        }

        SkipEnumerable.prototype.__iterator__ = function () {
            var index = 0;
            if (typeof this._selector === 'number') {
                for (let item in this._enumerable) {
                    if (index >= this._selector) {
                        yield item;
                    }
                    index++;
                }
            } else if (typeof this._selector === 'function') {
                let flag = false;
                index = -1;
                for (let item in this._enumerable) {
                    index++;
                    if (!flag && !this._selector(item, index)) {
                        flag = true;
                    }

                    if (flag) {
                        yield item;
                    }
                }
            }
        };

        return SkipEnumerable;
    })(Enumerable);

    var RepeatEnumerable = (function (__super) {
        __extends(RepeatEnumerable, __super);

        function RepeatEnumerable(item, count) {
            __super.call(this);
            this._item = item;
            this._count = count;
        }

        RepeatEnumerable.prototype.__iterator__ = function () {
             for (var i = 0; i < this._count; i++) {
                yield this._item;
             }
        };

        return RepeatEnumerable;
    })(Enumerable);

    Enumerable.range = function (start, end) {
        start = start || 0;
        end = end || 0;

        return new RangeEnumerable([], start, end);
    };

    Enumerable.repeat = function (item, count) {
        return new RepeatEnumerable(item, count || 0);
    };

    // extension methods
    Array.prototype.asEnumerable = function() {
        return new Enumerable(this);
    };

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = Enumerable;
    } else if (typeof define === 'function' && define.amd) {
        define('linq', function () {
            return Enumerable;
        });
    } else {
        global.Enumerable = Enumerable;
    }
})(this);