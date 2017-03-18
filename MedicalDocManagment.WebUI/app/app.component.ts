import { Component } from '@angular/core';

@Component({
        selector: 'my-app',
        template: `
                <h1>Добро пожаловать {{name}}!</h1>
                <label>Введите имя:</label>
                <input [(ngModel)]="name" placeholder="name">
                <app-user-add></app-user-add>
                `
})
export class AppComponent {
        name = '';
}