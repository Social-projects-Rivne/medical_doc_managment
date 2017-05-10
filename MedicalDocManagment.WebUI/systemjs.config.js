(function (global) {
    System.config({
        paths: {
            // псевдоним для пути к модулям
            'npm:': 'node_modules/',
            'dist:': 'dist/'
        },
        // указываем загрузчику System, где искать модули
        map: {
            // for app search in folder app
            'app': 'app',
            // пакеты angular
            '@angular/core': 'dist:lib/npmlibs/@angular/core.umd.js',
            '@angular/common': 'dist:lib/npmlibs/@angular/common.umd.js',
            '@angular/compiler': 'dist:lib/npmlibs/@angular/compiler.umd.js',
            '@angular/platform-browser': 'dist:lib/npmlibs/@angular/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'dist:lib/npmlibs/@angular/platform-browser-dynamic.umd.js',
            '@angular/http': 'dist:lib/npmlibs/@angular/http.umd.js',
            '@angular/router': 'dist:lib/npmlibs/@angular/router.umd.js',
            '@angular/forms': 'dist:lib/npmlibs/@angular/forms.umd.js',
            '@angular/upgrade': 'dist:lib/npmlibs/@angular/upgrade.umd.js',
            // остальные пакеты
            'rxjs': 'dist:lib/npmlibs/rxjs',
            'angular-in-memory-web-api': 'dist:js/in-memory-web-api.umd.js',
            'ng2-pagination': 'dist:lib/npmlibs/ng2-pagination/dist',
            // TODO
            //'angular2-notifications': 'dist:lib/npmlibs/angular2-notifications',
            'ngx-infinite-scroll': 'dist:js/ngx-infinite-scroll.umd.js',
            'moment': 'dist:js/moment/',
            'angular2-moment': 'dist:lib/npmlibs/angular2-moment'
        },
        // пакеты, которые указывают загрузчику System, как загружать файлы без имени и расширения
        packages: {
            'app': {
                defaultExtension: 'js',
                main: './main.js',
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'ng2-pagination': { main: 'ng2-pagination.js', defaultExtension: 'js' },
            // TODO
            //'angular2-notifications': { main: 'components.js', defaultExtension: 'js' },
            'moment': { main: 'moment-with-locales.min.js', defaultExtension: 'js' },
            'angular2-moment': { main: './index.js', defaultExtension: 'js' }
        }
    });
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }
})(this);