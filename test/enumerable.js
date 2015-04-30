/* global Enumerable */
/* global expect */
/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';
describe('Enumerable', function () {
    describe('creation', function () {
        it('should allow creation from an existing array', function () {
            var array = [1, 2, 3];

            var enumerable = array.asEnumerable();

            expect(enumerable).to.exist;
        });

        it('should allow creation without a constructor', function () {
            var enumerable = Enumerable();

            expect(enumerable).to.exist;
        });
    });

    describe('range', function () {
        it('should allow the creation of a range enumerable', function () {
            var range = Enumerable.range(1, 2);

            expect(range).to.exist;
        });

        it('should return values within the range', function () {
            var range = Enumerable.range(1, 2);

            var index = 1;
            for (var x of range()) {
                expect(x).to.equal(index);
                index++;
            }
        });

        it('should create a range of the expected length', function () {
            var range = Enumerable.range(1, 2);

            expect(range.toArray().length).to.equal(2);
        });

        it('should allow a select from a range', function () {
            var range = Enumerable.range(0, 10);

            var selected = range.select(x => x + 1);

            expect(selected.toArray()).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        });

        it('should allow a take from a range', function () {
            var range = Enumerable.range(0, 10);

            var taken = range.take(1);

            expect(taken.toArray()).to.deep.equal([0]);
        });
    });

    describe('repeat', function () {
        it('should allow the creation of a repeat enumerable', function () {
            var items = Enumerable.repeat(1, 1);

            expect(items).to.exist;
        });

        it('should create an enumerable of the expected length', function () {
            var items = Enumerable.repeat(1, 1);

            expect(items.toArray().length).to.equal(1);
        });

        it('should create an enumerable containing only the provided value', function () {
            var items = Enumerable.repeat('a', 3);

            expect(items.toArray()).to.deep.equal(['a', 'a', 'a']);
        });
    });

    describe('toArray', function () {
        it('should allow conversion back to an array', function () {
            var items = [1,2,3].asEnumerable().toArray();

            expect(items).isArray;
        });
    });
});
