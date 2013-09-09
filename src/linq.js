(function (global) {
    'use strict';

    var __extends = function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    var fnTrue = function () { return true; };

    var generator = function* (array) {
        for (let i = 0; i < array.length; i++) {
            yield array[i];
        }
    };

    var Enumerable = function (array) {
        if (this && this.constructor == Enumerable) {
            throw 'This is not a constructable type, don\'t use the `new` operator';
        }
        var instance = generator.bind(this, array);

        __extends(instance, generator);
        return instance
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

        for (let x in this()) {
            if (fn(x)) {
                return true;
            }
        }
        return false;
    }

    var count = function (fn) {
        fn = fn || fnTrue;

        var count = 0;
        for (var i in this()) {
            if (fn(i)) {
                count++;
            }
        }
        return count;
    };

    var where = function (fn) {
        return WhereEnumerable(this, fn);
    };

    var select = function (fn) {
        return new SelectEnumerable(this, fn);
    };

    var selectMany = function (fn) {
        return new SelectManyEnumerable(this, fn);
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

    var toArray = function() {
        var arr = [];
        for (let i of this()) {
            arr.push(i);
        }
        return arr;
    };

    generator.where = where;
    generator.filter = where;

    generator.select = select;
    generator.map = select;
    generator.selectMany = selectMany;

    generator.first = first(false, fnTrue);
    generator.firstOrDefault = first(true, fnTrue);

    generator.single = single(false, fnTrue);
    generator.singleOrDefault = single(true, fnTrue);

    generator.all = all;
    generator.any = any;
    generator.count = count;

    generator.take = take;
    generator.takeWhile = takeWhile;

    generator.skip = skip;
    generator.skipWhile = skipWhile;

    generator.toArray = toArray;

    var WhereEnumerable = (function (__super) {
        return function WhereEnumerable(parent, fn) {
            function* where(fn) {
                var index = 0;
                for (let x of parent()) {
                    if (fn(x, index)) {
                        yield x;
                    }
                    index++;
                }
            }

            var x = where.bind(this, fn);
            __extends(x, __super);
            return x;
        };
    })(generator);

    var SelectEnumerable = (function (__super) {
        return function (parent, fn) {
            var selector = function* (parent, fn) {
                var index = 0;
                for (let item of parent()) {
                    yield fn(item, index++);
                }
            };

            var instance = selector.bind(this, parent, fn);
            __extends(instance, __super);
            return instance;
        };
    })(generator);

    var SelectManyEnumerable = (function (__super) {
        __extends(SelectManyEnumerable, __super);
    
        function SelectManyEnumerable(enumerable, colSelector, resultSelector) {
            __super.call(this, enumerable, colSelector);
            this._resultSelector = resultSelector || ((col, x) => x);
        };

        SelectManyEnumerable.prototype.__iterator__ = function () {
            var index = 0;

            for (let item in this._enumerable) {
                let arr = this._fn(item, index++);
                for (let i = 0; i < arr.length; i++) {
                    let foo = this._resultSelector(arr, arr[i]);
                    yield foo;
                }
            }
        };

        return SelectManyEnumerable;
    })(SelectEnumerable);

    var RangeEnumerable = (function (__super) {
        return function (start, end) {
            var ranger = function* (start, end) {
                for (start; start <= end; start++) {
                    yield start;
                }
            };

            var instance = ranger.bind(this, start, end);
            __extends(instance, __super);
            return instance;
        };
    })(generator);

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
        return function (item, count) {
            var repeater = function* (item, count) {
                var stripped = JSON.stringify(item);
                for (var i = 0; i < count; i++) {
                    yield JSON.parse(stripped);
                }
            };

            var instance = repeater.bind(this, item, count);
            __extends(instance, __super);
            return instance;
        };
    })(generator);

    Enumerable.range = function (start, end) {
        start = start || 0;
        end = end || 0;

        return RangeEnumerable(start, end);
    };

    Enumerable.repeat = function (item, count) {
        return RepeatEnumerable(item, count || 0);
    };

    // extension methods
    Array.prototype.asEnumerable = function() {
        return Enumerable(this);
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