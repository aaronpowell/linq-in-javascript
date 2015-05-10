/* global Enumerable */
/* global expect */
/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';
describe('.select', function () {
    it('should have a .select method', function () {
        var enumerable = [].asEnumerable();

        expect(enumerable.select).to.exist;
    });

    it('should transform the items in the collection', function () {
        var arr = [1,2,3];
        var enumerable = arr.asEnumerable();

        var fn = x => x + 1;
        var res = enumerable.select(fn);

        var pos = 0;
        for (var x of res) {
            expect(x).to.equal(fn(arr[pos]));
            pos++;
        }
    });

    it('should process items in a lazy fashion', function () {
        var arr = [];
        arr.push(() => true);
        arr.push(() => expect(false).to.equal(true));

        var items = arr.asEnumerable();

        var filtered = items.select(x => x());

        var pos = 0;
        for (var item of filtered) {
            expect(item).to.equal(true);
            pos++;
            break;
        }
        expect(pos).to.equal(1);
    });

    it('should provide the index to the selector', function () {
        var items = [1, 2, 3].asEnumerable();

        var pos = 0;
        var filtered = items.select((item, i) => {
            expect(i).to.equal(pos);
            pos++;
            return true;
        });

        for (var item of filtered) {
            //noop
        }
        expect(pos).to.equal(3);
    });

    it.skip('should return the same result through multiple passes', function () {
        var arr = [1, 2, 3];

        var mapped = arr.asEnumerable().select(x => x + 1);

        var one = mapped.toArray();
        var two = mapped.toArray();

        expect(one).to.deep.equal(two);
    });
});

describe('.map', function () {
    it('should be able to use map like select', function () {
        var arr = [1,2,3];
        var enumerable = arr.asEnumerable();

        var fn = x => x + 1;
        var res = enumerable.map(fn);

        var pos = 0;
        for (var x of res) {
            expect(x).to.equal(fn(arr[pos]));
            pos++;
        }
    });
});

describe('.selectMany', function () {
    it('should collapse a simple nested array'  , function () {
        var items = [[1], [2], [3]].asEnumerable();

        var results = items.selectMany(x => x);

        expect(results.toArray()).to.deep.equal([1,2,3]);
    });

    it('should collapse a simple nested array and transform to new objects', function () {
        var items = [[1], [2], [3]].asEnumerable();

        var results = items.selectMany(x => x, y => y * 2);

        expect(results.toArray()).to.deep.equal([2,4,6]);
    });

    it('should collapse an array containing enumerables', function () {
        var items = [[1], [2], [3]].asEnumerable();

        var results = items.selectMany(x => x.asEnumerable().select(y => y + 1));

        expect(results.toArray()).to.deep.equal([2,3,4]);
    });

    it('should collapse an array containing enumerables and transform to new objects', function () {
        var items = [[1], [2], [3]].asEnumerable();

        var results = items.selectMany(x => x.asEnumerable().select(y => y + 1), z => z * 2);

        expect(results.toArray()).to.deep.equal([4,6,8]);
    });
});