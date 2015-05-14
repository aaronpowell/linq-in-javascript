/* global Enumerable */
/* global expect */
/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';
describe('.count', function () {
    it('should have a count method', function () {
        var enumerable = [].asEnumerable();
        expect(enumerable.count).to.exist;
    });

    it('should correctly report the number of items in the enumerable', function () {
        var items = [1,2,3];
        var enumerable = items.asEnumerable();

        expect(enumerable.count()).to.equal(items.length);
    });

    it('should allow a filter method for counting items', function () {
        var enumerable = [1,2,3].asEnumerable();

        expect(enumerable.count(x => x % 2 == 0)).to.equal(1);
    });

    it('should respect prefilters', function () {
        var enumerable = [1,2,3].asEnumerable();

        var filtered = enumerable.where(x => x % 2 == 0);

        expect(filtered.count()).to.equal(1);
    });
});