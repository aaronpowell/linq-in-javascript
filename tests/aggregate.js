describe('Enumerable', function () {
    describe('.aggregate', function () {
        it('should aggregate a collection and return the final value', function () {
            var arr = Enumerable.range(0, 10);

            var result = arr.aggregate((curr, next) => curr + next);

            expect(result).to.equal(45);
        });
    });
});