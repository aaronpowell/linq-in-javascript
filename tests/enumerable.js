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

    describe('.first', function () {
        it('should have a first method', function () {
            var items = [1, 2, 3].asEnumerable();

            expect(items.first).to.exist;
        });

        it('should return the first item in the collection when no additional filter applied', function () {
            var items = [1, 2, 3].asEnumerable();

            expect(items.first()).to.equal(1);
        });

        it('should allow a filter to be used to find a value', function () {
            var items = [1, 2, 3].asEnumerable();

            var item = items.first(item => item == 2);

            expect(item).to.equal(2);
        });

        it('should only return one value even if multiple match the selector', function () {
            var items = [1, 2, 2, 3].asEnumerable();

            var item = items.first(item => item == 2);

            expect(item).to.equal(2);
        });

        it('should raise an error when no match is found', function () {
            var items = [1, 2, 3].asEnumerable();

            expect(() => items.first(x => false)).throws();
        });
    });

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