/**
 * @fileoverview This file defines AppComponent — root component of front-end side of application.
 * @author Rv-023.Net
 */
import { Component } from '@angular/core';

import { UsersListComponent } from './userslist.component';

@Component({
  selector: 'my-app',
  template: '<h1>Добро пожаловать {{name}}!</h1>'+
    '<label>Введите имя:</label>'+
    '<input [(ngModel)]="name" placeholder="name">'+
    '<hr>'+
    '<usersList>Завантажується список користувачів...</usersList>'+
    '<hr></hr>'+
    '<app-user-add></app-user-add>'
})
export class AppComponent {
  name = '';
}
