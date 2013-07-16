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
});