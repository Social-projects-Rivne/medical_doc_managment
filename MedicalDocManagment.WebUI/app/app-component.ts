import { Component } from '@angular/core';

import { UsersListComponent } from './userslist-component';

@Component({
  selector: 'my-app',
  template: `<h1>Добро пожаловать {{name}}!</h1>
    <label>Введите имя:</label>
    <input [(ngModel)]="name" placeholder="name">`
    +
    `
    <hr>
    <usersList>Завантажується список користувачів...</usersList>
    `
})
export class AppComponent {
  name = '';
}