describe('Interesting API usages', function () {
   it('should calc prime numbers', function () {
        var range = Enumerable.range(3, 10);

        var primes = range.where(n => Enumerable.range(2, Math.floor(Math.sqrt(n))).all(i => n % i > 0));

        var expectedPrimes = [3, 5, 7];
        var index = 0;
        for (let prime of primes()) {
            expect(prime).to.equal(expectedPrimes[index]);
            index++;
        }
    }); 
});