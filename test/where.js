/* global Enumerable */
/* global expect */
/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';
describe('.where', function () {
    it('should handle simple lambda filters', function () {
        var arr = [1, 2, 3];
        var items = arr.asEnumerable();

        var filtered = items.where(x => true);

        var pos = 0;
        for (var item of filtered) {
            expect(item).to.equal(arr[pos]);
            pos++;
        }
    });

    it('should filter based on the provided lambda', function () {
        var arr = [1, 2, 3];
        var items = arr.asEnumerable();

        var filtered = items.where(x => x == 2);

        var pos = 0;
        for (var item of filtered) {
            expect(item).to.equal(2);
            pos++;
        }
        expect(pos).to.equal(1);
    });

    it('should allow multiple filters', function () {
        var arr = [1, 2, 3];
        var items = arr.asEnumerable();

        var filtered = items.where(x => x >= 2).where(x => x == 2);

        var pos = 0;
        for (var item of filtered) {
            expect(item).to.equal(2);
            pos++;
        }
        expect(pos).to.equal(1);
    });

    it('should process items in a lazy fashion', function () {
        var arr = [];
        arr.push(() => true);
        arr.push(() => expect(false).to.equal(true));

        var items = arr.asEnumerable();

        var filtered = items.where(x => x());

        var pos = 0;
        for (var item of filtered) {
            expect(item).to.equal(arr[pos]);
            pos++;
            break;
        }
        expect(pos).to.equal(1);
    });

    it('should provide the index to the selector', function () {
        var items = [1, 2, 3].asEnumerable();

        var pos = 0;
        var filtered = items.where((item, i) => {
            expect(i).to.equal(pos);
            pos++;
            return true;
        });

        for (var item of filtered) {
            //noop
        }
        expect(pos).to.equal(3);
    });
});

describe('.filter', function () {
    it('should be able to use filter like where', function () {
        var arr = [1, 2, 3];
        var items = arr.asEnumerable();

        var filtered = items.filter(x => true);

        var pos = 0;
        for (var item of filtered) {
            expect(item).to.equal(arr[pos]);
            pos++;
        }
    });
});