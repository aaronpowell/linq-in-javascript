/* global Enumerable */
/* global expect */
/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';
describe('.concat', function () {
    it('should allow concatting two Enumerable objects', function () {
        var first = Enumerable.range(0, 10);
        var second = Enumerable.range(0, 10);

        var combined = first.concat(second);

        expect(combined.count()).to.equal(20);
    });

    it('should allow concatting of an array to an enumerable', function () {
        var first = Enumerable.range(0, 10);
        var second = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        var combined = first.concat(second);

        expect(combined.count()).to.equal(20);
    });

    it('should contain all values from both collections', function () {
        var first = [0, 1, 2, 3, 4];
        var second = [5, 6, 7, 8, 9];

        var combined = first.asEnumerable().concat(second);

        expect(combined.toArray()).to.deep.equal(first.concat(second));
    });
});