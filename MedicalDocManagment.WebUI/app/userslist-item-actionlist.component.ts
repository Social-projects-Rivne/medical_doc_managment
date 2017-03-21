﻿/**
 * @fileoverview This file defines UsersListItemActionListComponent — component, which implements
 *     list of actions on item from list of users.
 * @author andriy_katsubo@ukr.net (Andriy Katsubo)
 */
import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';

import UserModel from './models/usermodel'

@Component({
  selector: '[usersList-Item-ActionList]',
  templateUrl: './app/views/userslist-item-actionlist.component.html'
})

/**
 * Class, which implements list of actions on item from list of users.
 */
export class UsersListItemActionListComponent {
}
