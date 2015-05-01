'use strict';

var fnTrue = () => true;
var fnSelf = x => x;

let enumerableSymbols = {
    arr: Symbol(),
    index: Symbol()
};

class Enumerable {
    constructor(arr = []) {
        this[enumerableSymbols.arr] = arr;
        this[enumerableSymbols.index] = 0;
    }

    [Symbol.iterator]() {
        return this;
    }

    next() {
        if (this[enumerableSymbols.index] < this[enumerableSymbols.arr].length) {
            return {
                value: this[enumerableSymbols.arr][this[enumerableSymbols.index]++],
                done: false
            };
        }

        return {
            done: true
        };
    }

    first(selector = fnTrue) {
        for (let item of this) {
            if (selector(item)) {
                return item;
            }
        }

        throw new Error('Sequence contains no matching elements');
    }

    firstOrDefault(selector = fnTrue) {
        try {
            return this.first(selector);
        } catch (e) {
            return undefined;
        }
    }

    single(selector = fnTrue) {
        var matched;
        for (let item of this) {
            if (selector(item)) {
                if (matched) {
                    throw Error('Sequence contains more than one matching element');
                } else {
                    matched = item;
                }
            }
        }
        if (matched) {
            return matched;
        }

        throw Error('Sequence contains no matching element');
    }

    singleOrDefault(selector = fnTrue) {
        try {
            return this.single(selector);
        } catch (e) {
            if (e.message === 'Sequence contains no matching element') {
                return undefined;
            }
            throw e;
        }
    }

    all(fn = fnTrue) {
        for (let x of this) {
            if (!fn(x)) {
                return false;
            }
        }
        return true;
    }

    any(fn = fnTrue) {
        for (let x of this) {
            if (fn(x)) {
                return true;
            }
        }
        return false;
    }

    count(fn = fnTrue) {
        var count = 0;
        for (let i of this) {
            if (fn(i)) {
                count++;
            }
        }
        return count;
    }

    aggregate(seed, fn, selector) {
        var it = this;

        switch (arguments.length) {
            case 1:
                fn = seed;
                seed = it.next().value;
                break;

            case 2:
                if (typeof seed === 'function') {
                    selector = fn;
                    fn = seed;
                    seed = it.next().value;
                }
                break;
        }
        for (let item of it) {
            seed = fn(seed, item);
        }

        if (selector) {
            return selector(seed);
        }
        return seed;
    }

    average(fn = fnSelf) {
        var total = 0;
        var count = 0;

        for (let item of this) {
            total += fn(item);
            count++;
        }

        if (count) {
            return total / count;
        }

        throw Error('Sequence contains no elements');
    }

    concat(col) {
        return new ConcatEnumerable(this, col);
    }

    contains(value, tester = x => x === value) {
        var it = this;

        for (let item of it) {
            if (tester(item, value)) {
                return true;
            }
        }
        return false;
    }

    where(selector) {
        return new WhereEnumerable(this, selector);
    }

    select(fn = fnSelf) {
        return new SelectEnumerable(this, fn);
    }

    map(fn) {
        return this.select(fn);
    }

    selectMany(fn = fnSelf) {
        return new SelectManyEnumerable(this, fn);
    }

    take(count = 0) {
        return new TakeEnumerable(this, count);
    }

    takeWhile(fn = 0) {
        if (fn === 0) {
            return this.take();
        }
        return new TakeEnumerable(this, fn);
    }

    skip(count = 0) {
        return new SkipEnumerable(this, count);
    }

    skipWhile(fn = 0) {
        if (fn === 0) {
            return this.skip();
        }
        return new SkipEnumerable(this, fn);
    }

    toArray() {
        var arr = [];
        for (let i of this) {
            arr.push(i);
        }
        return arr;
    }

    static range(start = 0, end = 0) {
        return new RangeEnumerable(start, end);
    }

    static repeat(item, count = 0) {
        return new RepeatEnumerable(item, count);
    }
}

class ConcatEnumerable extends Enumerable {
    constructor(arr, col) {
        super();
        this.arr = arr;
        this.col = Array.isArray(col) ? col.asEnumerable() : col;
    }

    next() {
        var value = this.arr.next();
        if (!value.done) {
            return value;
        }

        value = this.col.next();
        return value;
    }
}

class WhereEnumerable extends Enumerable {
    constructor(arr, selector) {
        super();
        this.arr = arr;
        this.selector = selector;
    }

    next() {
        var val = this.arr.next();
        if (val.done) {
            return val;
        }

        if (this.selector(val.value)) {
            return val;
        }

        return this.next();
    }
}

class SelectEnumerable extends Enumerable {
    constructor(arr, fn) {
        super();
        this.arr = arr;
        this.fn = fn;
        this._index = 0;
    }

    next() {
        var value = this.arr.next();
        if (value.done) {
            return value;
        }
        return {
            value: this.fn(value.value, this._index++),
            done: false
        };
    }
}

class SelectManyEnumerable extends Enumerable {
    constructor(arr, colSelector, resultSelector) {
        super();
        this.arr = arr;
        this.colSelector = colSelector;
        this.resultSelector = resultSelector || ((_, x) => x);
        this._index = 0;
    }

    next() {
        var value = this.arr.next();
        if (value.done) {
            return value;
        }
        let arr = this.colSelector(value.value, this._index++);
        return {
            value: this.resultSelector(arr, arr[0]),
            done: false
        };
    }
}

class RangeEnumerable extends Enumerable {
    constructor(start, count) {
        super();
        this.count = count;
        this.index = 0;
        this.start = start;
    }

    next() {
        if (this.index === this.count) {
            return {
                done: true
            };
        }

        var value = this.start;
        this.start++;
        this.index++;
        return {
            value: value,
            done: false
        };
    }
}

class TakeEnumerable extends Enumerable {
    constructor(arr, selector) {
        super();
        this.arr = arr;
        this.selector = selector;
        this.index = 0;
    }

    next() {
        var item = this.arr.next();
        if (item.done) {
            return item;
        }

        if (typeof this.selector === 'number') {
            if (this.index < this.selector) {
                this.index++;
                return item;
            } else {
                return {
                    done: true
                };
            }
        } else {
            if (this.selector(item.value, this.index)) {
                this.index++;
                return item;
            } else {
                return {
                    done: true
                };
            }
        }
    }
}

class SkipEnumerable extends Enumerable {
    constructor(arr, selector) {
        super();
        this.arr = arr;
        this.selector = selector;
        this.index = 0;
    }

    next() {
        var item = this.arr.next();
        if (item.done) {
            return item;
        }

        if (typeof this.selector === 'number') {
            if (this.index >= this.selector) {
                this.index++;
                return item;
            } else {
                return this.next();
            }
        } else {
            if (this.selector(item.value, this.index)) {
                return this.next();
            } else {
                return item;
            }
        }
    }
}

class RepeatEnumerable extends Enumerable {
    constructor(item, count) {
        super();
        this.item = item;
        this.count = count;
        this.index = 0;
    }

    next() {
        if (this.index === this.count) {
            return {
                done: true
            };
        }

        var stripped = JSON.stringify(this.item);
        this.index++;
        return {
            value: JSON.parse(stripped),
            done: false
        };
    }
}

// extension methods
Array.prototype.asEnumerable = function() {
    return new Enumerable(this);
};

export default Enumerable;