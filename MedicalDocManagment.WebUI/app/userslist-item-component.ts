import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';

import UserModel from './models/usermodel'
import { UsersListItemActionListComponent } from './userslist-item-actionlist-component';

@Component({
  selector: '[usersListItem]',
  templateUrl: './app/views/userslist-item-component.html'
})

export class UsersListItemComponent {
  @Input() user: UserModel;
}

