describe('.all', function () {
    it('should return true only if all values in the enumerable are true', function () {
        var enumerable = [true, true].asEnumerable();

        var all = enumerable.all(x => x);

        expect(all).to.equal(true);
    });

    it('should return false if not all values return true', function () {
        var enumerable = [true, false, true].asEnumerable();

        var all = enumerable.all(x => x);

        expect(all).to.equal(false);
    });
});