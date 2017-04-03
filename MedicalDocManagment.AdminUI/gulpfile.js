'use strict';

var _      = require('lodash'),
    gulp   = require('gulp'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin');

var angularJs = [
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js'
];

var js = [
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/systemjs/dist/system.js',
    './node_modules/rxjs/bundles/Rx.js',
    './node_modules/typescript/lib/typescript.js',
    './node_modules/jquery/dist/jquery.js'
];

var css = [
    './node_modules/bootstrap/dist/css/bootstrap.css'
];

var fonts = [
    './node_modules/bootstrap/dist/fonts/*.*'
];

gulp.task('copy-js', function() {
    _.forEach(js, function(file, _) {
        gulp.src(file).pipe(gulp.dest('./dist/js'))
    });

    _.forEach(angularJs, function(file, _) {
        gulp.src(file).pipe(gulp.dest('./dist/js/angular2'))
    });
});

gulp.task('copy-min-js', function() {
    _.forEach(js, function(file, _) {
        gulp.src(file).pipe(uglify())
                      .pipe(rename({ extname: '.min.js' }))
                      .pipe(gulp.dest('.dist/js'))
    });

    _.forEach(angularJs, function(file, _) {
        gulp.src(file).pipe(uglify())
                      .pipe(rename({ extname: '.min.js' }))
                      .pipe(gulp.dest('.dist/js/angular2'))
    });
});

gulp.task('copy-css', function () {
    _.forEach(css, function (file, _) {
        gulp.src(file)
            .pipe(gulp.dest('./dist/css'))
    });
    _.forEach(fonts, function (file, _) {
        gulp.src(file)
            .pipe(gulp.dest('./dist/fonts'))
    });
});

gulp.task('copy-min-css', function () {
    _.forEach(css, function (file, _) {
        gulp.src(file)
            .pipe(cssmin())
            .pipe(rename({ extname: '.min.css' }))
            .pipe(gulp.dest('./dist/css'))
    });
    _.forEach(fonts, function (file, _) {
        gulp.src(file)
            .pipe(gulp.dest('./dist/fonts'))
    });
});
gulp.task("copy-ng2-pagination", () => {
    gulp.src([
        'ng2-pagination/**'
    ], {
        cwd: "./node_modules/**"
    }).pipe(gulp.dest("./dist/lib/npmlibs"));
});

gulp.task('default', ['copy-js', 'copy-css', 'copy-ng2-pagination']);
gulp.task('minify', ['copy-min-js', 'copy-min-css']);
