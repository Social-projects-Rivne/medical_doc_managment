import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';

import ItemActionListComponent from './item-actionlist.component';
import UserModel from '../../models/usermodel'

@Component({
  moduleId: module.id,
  selector: '[item]',
  templateUrl: 'views/item.component.html',
  styleUrls: ['views/item.component.css'],
})

/**
 * Class, which implements item from list of users.
 */
export default class ItemComponent {
  /**
   * Property which receives data about user from users list.
   * @type {UserModel}
   */
  @Input() user: UserModel;
}

