import { Component } from '@angular/core';
import { Response } from '@angular/http';

import UserModel from './models/usermodel';

import { UsersListItemComponent } from './userslist-item-component';
import { UsersListPaginationComponent } from './userslist-pagination-component';

@Component({
  selector: 'usersList',
  templateUrl: './app/views/userslist-component.html'
})

export class UsersListComponent {
  users: Array<UserModel>;

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList(): void {
    // mock-up
    this.users = new Array<UserModel>(
      { id: 1, username: 'Іван', email: 'ivan@lala.net', avatar: '\\avatars\\fire_01.gif', position: 'лікар', role: { id: 1, role: 'роль 1' }, isActive: true },
      { id: 2, username: 'Степан', email: 'stepan@lala.net', avatar: '\\avatars\\fire_01.gif', position: 'лікар', role: { id: 1, role: 'роль 1' }, isActive: true },
      { id: 3, username: 'Сергій', email: 'sergiy@lala.net', avatar: '\\avatars\\girl_with_cigarette.jpg', position: 'лікар', role: { id: 2, role: 'роль 2' }, isActive: false }
    );
  }

}

