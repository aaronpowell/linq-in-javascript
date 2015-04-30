var gulp = require('gulp');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var rename = require('gulp-rename')

gulp.task('watch', function () {
    gulp.watch('./src/linq.js', ['build', 'build-es5']);
});

gulp.task('build', function () {
    return gulp.src('./src/linq.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            modules: 'common',
            blacklist: ['regenerator']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-es5', function () {
    return gulp.src('./src/linq.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            modules: 'common'
        }))
        .pipe(sourcemaps.write())
        .pipe(rename('linq-es5.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build', 'build-es5']);
