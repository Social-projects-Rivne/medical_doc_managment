'use strict';

var _      = require('lodash'),
    gulp   = require('gulp'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    less   = require('gulp-less');

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
    './node_modules/jquery/dist/jquery.js',
    './node_modules/mdbootstrap/js/mdb.js',
    './node_modules/tether/dist/js/tether.js',
    './node_modules/traceur/bin/traceur.js'
];

var css = [
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/mdbootstrap/css/mdb.css',
    './node_modules/tether/dist/css/*.*',
    './node_modules/primeng/resources/primeng.min.css',
    './node_modules/font-awesome/css/font-awesome.min.css'
];

var fonts = [
    './node_modules/bootstrap/dist/fonts/*.*',
    './node_modules/font-awesome/fonts/*.*'
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

gulp.task('copy-mdbootstrap', () => {
    gulp.src([
        '**/*'
    ], {
        cwd: './node_modules/mdbootstrap/font/**'
    }).pipe(gulp.dest('./dist/font'));
});

gulp.task('copy-ng2-datepicker', () => {
    gulp.src('*', { cwd: './node_modules/ng2-datepicker/lib-dist' })
        .pipe(gulp.dest('./dist/lib/npmlibs/ng2-datepicker'));
});

gulp.task('copy-ng2-slimscroll', () => {
    gulp.src('*.*', { cwd: './node_modules/ng2-slimscroll/'})
        .pipe(gulp.dest('./dist/lib/npmlibs/ng2-slimscroll'));
    gulp.src('**/*', { cwd: './node_modules/ng2-slimscroll/src' })
        .pipe(gulp.dest('./dist/lib/npmlibs/ng2-slimscroll/src'));
});

gulp.task('copy-moment', () => {
    gulp.src('*.*', { cwd: './node_modules/moment/min' })
        .pipe(gulp.dest('./dist/js/moment'));
});

gulp.task('less', () => {
    gulp.src('./app/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./app/'));
});

gulp.task('default', ['copy-js', 'copy-css', 'copy-ng2-pagination', 'copy-mdbootstrap'
    , 'copy-ng2-datepicker', 'copy-ng2-slimscroll', 'copy-moment', 'less']);
gulp.task('minify', ['copy-min-js', 'copy-min-css']);
