/* global Enumerable */
/* global expect */
/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';
describe('.average', function () {
    it('should calculate the average', function () {
        var arr = Enumerable.range(0, 10);

        var average = arr.average();

        expect(average).to.equal(4.5);
    });

    it('should throw an error if there is an empty colleciton', function () {
        var arr = [].asEnumerable();

        expect(arr.average).to.throw(Error);
    });

    it('should allow a function to manupulate the values being averaged', function () {
        var arr = Enumerable.range(0, 10);

        var average = arr.average(x => x * 2);

        expect(average).to.equal(9);
    });
});