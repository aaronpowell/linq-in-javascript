/* global Enumerable */
/* global expect */
/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';
describe('skip', function () {
    it('should have a take method on the enumerable', function () {
        var enumerable = [1, 2].asEnumerable();

        expect(enumerable.skip).to.exist;
    });

    it('should give you only the number of items your request', function () {
        var enumerable = [1,2,3].asEnumerable();

        var taken = enumerable.skip(1).toArray();

        expect(taken.length).to.equal(2);
    });

    it('should give you only process the items that were in the skip scope', function () {
        var enumerable = [() => expect(false).to.equal(true), () => 1].asEnumerable();

        var taken = enumerable.skip(1).toArray();

        expect(taken[0]()).to.equal(1);
    });
});

describe('skipWhile', function () {
    it('should stop when the selector function return false', function () {
        var enumerable = [1, 2, 3, 4].asEnumerable();

        var taken = enumerable.skipWhile(x => x > 2).toArray();

        expect(taken.length).to.deep.equal(4);
    });

    it('should return items when the selector returns true', function () {
        var enumerable = [1, 2, 3, 4].asEnumerable();

        var taken = enumerable.skipWhile(x => x <= 2).toArray();

        expect(taken).to.deep.equal([3, 4]);
    });

    it('should receive the index during the selector function', function () {
        var enumerable = [1, 2, 3, 4].asEnumerable();

        var index = 0;
        var taken = enumerable.skipWhile((x, i) => {
            expect(i).to.equal(index);
            index++;
            return x <= 2;
        });

        for (var item in taken) {
            
        }
    });
});