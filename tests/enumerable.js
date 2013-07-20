describe('Enumerable', function () {
    describe('creation', function () {
        it('should allow creation from an existing array', function () {
            var array = [1, 2, 3];

            var enumerable = array.asEnumerable();

            expect(enumerable).to.exist;
        });

        it('should allow creation from a constructor', function () {
            var enumerable = new Enumerable();

            expect(enumerable).to.be.instanceOf(Enumerable);
        });

        it('should allow creation without a constructor', function () {
            var enumerable = Enumerable();

            expect(enumerable).to.be.instanceOf(Enumerable);
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
            for (var x in range) {
                expect(x).to.equal(index);
                index++;
            }
        });

        it('should calc prime numbers', function () {
            var range = Enumerable.range(3, 10);

            var primes = range
                .where(n =>
                    Enumerable.range(2, Math.floor(Math.sqrt(n)))
                        .all(i => n % i > 0)
                );

            var expectedPrimes = [3, 5, 7];
            var index = 0;
            for (let prime in primes) {
                expect(prime).to.equal(expectedPrimes[index]);
                index++;
            }
        });
    });
});