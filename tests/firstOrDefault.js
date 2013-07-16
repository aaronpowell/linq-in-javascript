describe('Enumerable', function () {
    describe('.firstOrDefault', function () {
        it('should have a firstOrDefault method', function () {
            var items = [1, 2, 3].asEnumerable();

            expect(items.firstOrDefault).to.exist;
        });

        it('should return the firstOrDefault item in the collection when no additional filter applied', function () {
            var items = [1, 2, 3].asEnumerable();

            expect(items.firstOrDefault()).to.equal(1);
        });

        it('should allow a filter to be used to find a value', function () {
            var items = [1, 2, 3].asEnumerable();

            var item = items.firstOrDefault(item => item == 2);

            expect(item).to.equal(2);
        });

        it('should only return one value even if multiple match the selector', function () {
            var items = [1, 2, 2, 3].asEnumerable();

            var item = items.firstOrDefault(item => item == 2);

            expect(item).to.equal(2);
        });

        it('should return undefined when no match is found', function () {
            var items = [1, 2, 3].asEnumerable();

            expect(items.firstOrDefault(x => false)).to.not.exist;
        });
    });
});