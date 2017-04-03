﻿(function (global) {
    System.config({
        paths: {
            // псевдоним для пути к модулям
            'npm:': 'node_modules/',
            'dist': 'dist/'
        },
        // указываем загрузчику System, где искать модули
        map: {
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
            'ng2-pagination': 'dist/lib/npmlibs/ng2-pagination/dist',
            'angular2-notifications': 'node_modules/angular2-notifications'
        },
        // пакеты, которые указывают загрузчику System, как загружать файлы без имени и расширения
        packages: {
            rxjs: {
                defaultExtension: 'js'
            },
            'ng2-pagination': { main: 'ng2-pagination.js', defaultExtension: 'js' },
            'angular2-notifications': { main: 'components.js', defaultExtension: 'js' }
        }
    });
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }
})(this);