import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';

import { UsersListPageItemActionListComponent } from './userslist-page-item-actionlist.component';
import UserModel from '../../models/usermodel'

@Component({
  moduleId: module.id,
  selector: '[usersList-Page-Item]',
  templateUrl: './views/userslist-page-item.component.html',
  styleUrls: ['./views/userslist-page-item.component.css'],
})

/**
 * Class, which implements item from list of users.
 */
export class UsersListPageItemComponent {
  /**
   * Property which receives data about user from users list.
   * @type {UserModel}
   */
  @Input() user: UserModel;
}

