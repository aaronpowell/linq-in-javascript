describe('Enumerable', function () {
    describe('.singleOrDefault', function () {
        it('should have a singleOrDefault method', function () {
            var items = [1, 2, 3].asEnumerable();

            expect(items.singleOrDefault).to.exist;
        });

        it('should throw when no additional filter applied and there\'s more than one item in the collection', function () {
            var items = [1, 2, 3].asEnumerable();

            expect(() => items.singleOrDefault()).to.throws();
        });

        it('shouldn\'t throw when no additional filter applied and there\'s only one item', function () {
            var items = [1].asEnumerable();

            expect(items.singleOrDefault()).to.equal(1);
        });

        it('should allow a filter to be used to find a value', function () {
            var items = [1, 2, 3].asEnumerable();

            var item = items.singleOrDefault(item => item == 2);

            expect(item).to.equal(2);
        });

        it('should throw if multiple match the selector', function () {
            var items = [1, 2, 2, 3].asEnumerable();

            expect(() => items.singleOrDefault(item => item == 2)).to.throws();
        });

        it('should return undefined when no match is found', function () {
            var items = [1, 2, 3].asEnumerable();

            expect(items.singleOrDefault(x => false)).to.not.exist;
        });
    });
});