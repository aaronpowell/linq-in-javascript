/* global Enumerable */
/* global expect */
/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';
describe('.any', function () {
    describe('return true', function () {
        it('should return true when no callback and the collection has items', function () {
            var enumerable = [1].asEnumerable();

            expect(enumerable.any()).to.equal(true);
        });

        it('should return true when at least one item matches the selector', function () {
            var enumerable = [1, 2, 3].asEnumerable();

            var any = enumerable.any(x => x >= 2);

            expect(any).to.equal(true);
        });

        it('should return true when only one item matches he selector', function () {
            var enumerable = [1, 2, 1, 1].asEnumerable();

            var any = enumerable.any(x => x != 1);

            expect(any).to.equal(true);
        });
    });

    describe('return false', function () {
        it('should return false when there are no items in the collection', function () {
            expect([].asEnumerable().any()).to.equal(false);
        });

        it('should return false when there are no items even if there\'s a function', function () {
            expect([].asEnumerable().any(x => true)).to.equal(false);
        });

        it('should return false when no items match the selector', function () {
            var items = [1, 2, 3].asEnumerable();

            var any = items.any(x => x > 4);

            expect(any).to.equal(false);
        });
    });
});