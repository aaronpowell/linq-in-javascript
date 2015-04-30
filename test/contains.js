/* global Enumerable */
/* global expect */
/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';
describe('.contains', function () {
    it('should return true if it finds a matching value', function () {
        var arr = Enumerable.range(0, 10);

        expect(arr.contains(5)).to.equal(true);
    });

    it('should return false if there is no matching value', function () {
        var arr = Enumerable.range(0, 10);

        expect(arr.contains(-5)).to.equal(false);
    });

    it('should allow a custom equality tester', function () {
        var arr = Enumerable.range(0, 10);

        expect(arr.contains(5, (x, y) => x == y)).to.equal(true);
    });
});