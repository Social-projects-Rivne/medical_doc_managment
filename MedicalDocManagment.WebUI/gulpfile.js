'use strict';

var _      = require('lodash'),
    gulp   = require('gulp'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename')

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
    './node_modules/tether/dist/js/tether.js',
    './node_modules/angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
    './node_modules/ngx-infinite-scroll/bundles/ngx-infinite-scroll.umd.js'
];

var css = [
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/tether/dist/css/*.*',
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

gulp.task("copy-ng2-pagination", function () {
    gulp.src([
        'ng2-pagination/**'
    ], {
        cwd: "./node_modules/**"
    }).pipe(gulp.dest("./dist/lib/npmlibs"));
});

gulp.task('copy-moment', function () {
    gulp.src('**', { cwd: './node_modules/moment/min' })
        .pipe(gulp.dest('./dist/js/moment'));
});

gulp.task('copy-bootstrap-datepicker', function () {
    gulp.src('./node_modules/bootstrap-datepicker/dist/css/**')
        .pipe(gulp.dest('./dist/css/bootstrap-datepicker/'));
    gulp.src('./node_modules/bootstrap-datepicker/dist/js/**')
        .pipe(gulp.dest('./dist/js/bootstrap-datepicker/'));
    gulp.src('./node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.uk.min.js')
        .pipe(gulp.dest('./dist/js/bootstrap-datepicker/'));
});

gulp.task('copy-angular2-moment', function () {
    gulp.src('**', { cwd: './node_modules/angular2-moment/' })
        .pipe(gulp.dest('./dist/lib/npmlibs/angular2-moment'));
});

gulp.task('copy-@angular', function () {
    gulp.src('./node_modules/@angular/core/bundles/core.umd.js')
        .pipe(gulp.dest('./dist/lib/npmlibs/@angular/'));
    gulp.src('./node_modules/@angular/common/bundles/common.umd.js')
        .pipe(gulp.dest('./dist/lib/npmlibs/@angular/'));
    gulp.src('./node_modules/@angular/compiler/bundles/compiler.umd.js')
        .pipe(gulp.dest('./dist/lib/npmlibs/@angular/'));
    gulp.src('./node_modules/@angular/platform-browser/bundles/platform-browser.umd.js')
        .pipe(gulp.dest('./dist/lib/npmlibs/@angular/'));
    gulp.src('./node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js')
        .pipe(gulp.dest('./dist/lib/npmlibs/@angular/'));
    gulp.src('./node_modules/@angular/http/bundles/http.umd.js')
        .pipe(gulp.dest('./dist/lib/npmlibs/@angular/'));
    gulp.src('./node_modules/@angular/router/bundles/router.umd.js')
        .pipe(gulp.dest('./dist/lib/npmlibs/@angular/'));
    gulp.src('./node_modules/@angular/forms/bundles/forms.umd.js')
        .pipe(gulp.dest('./dist/lib/npmlibs/@angular/'));
    gulp.src('./node_modules/@angular/upgrade/bundles/upgrade.umd.js')
        .pipe(gulp.dest('./dist/lib/npmlibs/@angular/'));
});

gulp.task('copy-angular2-notifications', function () {
    //gulp.src('**', { cwd: './node_modules/angular2-notifications/' })
    //    .pipe(gulp.dest('./dist/lib/npmlibs/angular2-notifications'));

    //gulp.src('**/*', { cwd: './node_modules/@angular/' })
    //    .pipe(gulp.dest('./dist/lib/npmlibs/angular2-notifications/aot/node_modules/@angular'));
});


gulp.task('copy-rxjs', function () {
    gulp.src('**/*', { cwd: './node_modules/rxjs/' })
        .pipe(gulp.dest('./dist/lib/npmlibs/rxjs'));
});


gulp.task('default', ['copy-js', 'copy-css', 'copy-ng2-pagination', 'copy-moment',
    'copy-bootstrap-datepicker', 'copy-angular2-moment', 'copy-@angular',
    'copy-angular2-notifications', 'copy-rxjs']);
gulp.task('minify', ['copy-min-js', 'copy-min-css']);
