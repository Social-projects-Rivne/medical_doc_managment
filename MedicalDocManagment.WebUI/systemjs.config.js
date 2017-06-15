(function (global) {
    System.config({
        paths: {
            // псевдоним для пути к модулям
            'npm:': 'node_modules/',
            'dist:': 'dist/'
        },
        // указываем загрузчику System, где искать модули
        map: {
            // locations of Angular applications
            //admin_app: 'app/admin',
            //login_app: 'app/core',
            //main_app: 'app/main',
            // for app search in folder app
            'app': 'app',
            // пакеты angular
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
            // остальные пакеты
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            'ng2-pagination': 'dist:lib/npmlibs/ng2-pagination/dist',
            'angular2-notifications': 'node_modules/angular2-notifications',
            'ngx-infinite-scroll':'node_modules/ngx-infinite-scroll',
            'moment': 'dist:js/moment/',
            'angular2-moment': 'dist:lib/npmlibs/angular2-moment',
            'angular2-image-upload': 'node_modules/angular2-image-upload',
            'mydatepicker': 'npm:mydatepicker/bundles/mydatepicker.umd.min.js',
            'angular2-masonry': 'dist:lib/npmlibs/angular2-masonry',
            'masonry-layout': 'dist:lib/npmlibs/masonry-layout/masonry.pkgd.min.js'
        },
        // пакеты, которые указывают загрузчику System, как загружать файлы без имени и расширения
        packages: {
            admin_app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            login_app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            main_app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            'app': {
                defaultExtension: 'js',
                main: './main.js',
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'ng2-pagination': { main: 'ng2-pagination.js', defaultExtension: 'js' },
            'angular2-notifications': { main: 'components.js', defaultExtension: 'js' },
            'moment': { main: 'moment-with-locales.min.js', defaultExtension: 'js' },
            'angular2-moment': { main: './index.js', defaultExtension: 'js' },
            'ngx-infinite-scroll': {
                main: 'bundles/ngx-infinite-scroll.umd.js',
                defaultExtension: 'js'
            },
            'angular2-image-upload': { main: './index.js', defaultExtension: 'js' },
            'angular2-masonry': { main: 'index', defaultExtension: 'js' }
        }
    });
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }
})(this);
