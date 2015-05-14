var gulp = require('gulp');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');

gulp.task('watch', function () {
    gulp.watch('./src/linq.js', ['default']);
});

gulp.task('build', function () {
    return gulp.src('./src/linq.js')
        .pipe(eslint())
        .pipe(eslint.formatEach())
        .pipe(eslint.failOnError())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

gulp.task('tests', function () {
    require('./test-helpers/_helper');

    var path = require('path');
    var linqPath = path.join(__dirname, './test-helpers/_es6.js');
    if (require.cache[linqPath]) {
        console.log('removing helper path');
        delete require.cache[linqPath];
    }

    linqPath = path.join(__dirname, './dist/linq.js');
    if (require.cache[linqPath]) {
        console.log('removing LINQ path');
        delete require.cache[linqPath];
    }

    require('./test-helpers/_es6');
    return gulp.src('./test/*.js', { read: false })
        .pipe(mocha());
});

gulp.task('tests-es5', function () {
    require('./test-helpers/_helper');
    require('./test-helpers/_es5');
    return gulp.src('./test/*.js', { read: false })
        .pipe(mocha());
});

gulp.task('build-es5', function () {
    return gulp.src('./src/linq.js')
        .pipe(eslint())
        .pipe(eslint.formatEach())
        .pipe(eslint.failOnError())
        .pipe(sourcemaps.init())
        .pipe(babel({
            modules: 'common'
        }))
        .pipe(sourcemaps.write())
        .pipe(rename('linq-es5.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['es6', 'es5']);
gulp.task('es6', ['build', 'tests']);
gulp.task('es5', ['build-es5', 'tests-es5']);
