/* global Enumerable */
/* global expect */
/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';
describe('take', function () {
    it('should have a take method on the enumerable', function () {
        var enumerable = [1, 2].asEnumerable();

        expect(enumerable.take).to.exist;
    });

    it('should give you only the number of items your request', function () {
        var enumerable = [1,2,3].asEnumerable();

        var taken = enumerable.take(1).toArray();

        expect(taken.length).to.equal(1);
    });

    it('should give you only process the items that were in the take scope', function () {
        var enumerable = [() => 1, () => expect(false).to.equal(true)].asEnumerable();

        var taken = enumerable.take(1).toArray();

        expect(taken.length).to.equal(1);
    });
});

describe('takeWhile', function () {
    it('should stop when the selector function return false', function () {
        var enumerable = [1, 2, 3, 4].asEnumerable();

        var taken = enumerable.takeWhile(x => x > 2).toArray();

        expect(taken.length).to.deep.equal(0);
    });

    it('should return items when the selector returns true', function () {
        var enumerable = [1, 2, 3, 4].asEnumerable();

        var taken = enumerable.takeWhile(x => x <= 2).toArray();

        expect(taken).to.deep.equal([1, 2]);
    });

    it('should receive the index during the selector function', function () {
        var enumerable = [1, 2, 3, 4].asEnumerable();

        var taken = enumerable.takeWhile((x, i) => {
            expect(i).to.equal(index);
            return x <= 2;
        });

        var index = 0;

        for (var item in taken) {
            index++;
        }
    });
});