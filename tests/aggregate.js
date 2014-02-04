describe('Enumerable', function () {
    describe('.aggregate', function () {
        it('should aggregate a collection and return the final value', function () {
            var arr = Enumerable.range(0, 10);

            var result = arr.aggregate((curr, next) => curr + next);

            expect(result).to.equal(45);
        });

        it('should allow a seed value for the aggregation', function () {
            var arr = Enumerable.range(0, 10);

            var result = arr.aggregate(1, (curr, next) => curr + next);

            expect(result).to.equal(46);
        });

        it('should have a results selector', function () {
            var arr = ["apple", "mango", "orange", "passionfruit", "grape"].asEnumerable();

            var result = arr.aggregate(
                "banana",
                (longest, next) => next.length > longest.length ? next : longest,
                fruit => fruit.toUpperCase()
                );

            expect(result).to.equal('PASSIONFRUIT');
        });

        it('should be able to use a result selector without a seed', function () {
            var arr = ["apple", "mango", "orange", "passionfruit", "grape"].asEnumerable();

            var result = arr.aggregate(
                (longest, next) => next.length > longest.length ? next : longest,
                fruit => fruit.toUpperCase()
                );

            expect(result).to.equal('PASSIONFRUIT'); 
        });
    });
});