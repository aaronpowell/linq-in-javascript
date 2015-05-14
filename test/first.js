/* global Enumerable */
/* global expect */
/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';
describe('.first', function () {
    it('should have a first method', function () {
        var items = [1, 2, 3].asEnumerable();

        expect(items.first).to.exist;
    });

    it('should return the first item in the collection when no additional filter applied', function () {
        var items = [1, 2, 3].asEnumerable();

        expect(items.first()).to.equal(1);
    });

    it('should allow a filter to be used to find a value', function () {
        var items = [1, 2, 3].asEnumerable();

        var item = items.first(item => item == 2);

        expect(item).to.equal(2);
    });

    it('should only return one value even if multiple match the selector', function () {
        var items = [1, 2, 2, 3].asEnumerable();

        var item = items.first(item => item == 2);

        expect(item).to.equal(2);
    });

    it('should raise an error when no match is found', function () {
        var items = [1, 2, 3].asEnumerable();

        expect(() => items.first(x => false)).throws();
    });
});