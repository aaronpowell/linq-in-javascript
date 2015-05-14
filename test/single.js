/* global Enumerable */
/* global expect */
/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';
describe('.single', function () {
    it('should return the uniquely matched value', function () {
        var enumerable = [1, 2, 3].asEnumerable();

        var item = enumerable.single(x => x == 2);

        expect(item).to.equal(2);
    });

    it('should throw if more than one item is matched', function () {
        var enumerable = [1, 2, 3, 2].asEnumerable();

        expect(() => enumerable.single(x => x == 2)).to.throws();
    });

    it('should throw if no match is location', function () {
        var enumerable = [1, 2, 3].asEnumerable();

        expect(() => enumerable.single(x => x == 4)).to.throws();
    })
});