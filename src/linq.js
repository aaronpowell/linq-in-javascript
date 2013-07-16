(function (global) {
    'use strict';

    var __extends = function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        __.prototype = b.prototype;
        d.prototype = new __();
    };

    var fnTrue = function () { return true };


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

            for (var item in this._enumerable) {
                if (this._fn(item)) {
                    arr.push(item);
                    yield item;
                }
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

            for (var item in this._enumerable) {
                let x = this._fn(item);
                arr.push(x);
                yield x;
            }

        this._enumerable = new Enumerable(arr);
        };

        return SelectEnumerable;
    })(Enumerable);

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