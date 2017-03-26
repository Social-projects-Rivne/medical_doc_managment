import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';

import ItemActionListComponent from './item-actionlist.component';
import UserModel from '../../models/user.model'

@Component({
  moduleId: module.id,
  selector: '[item]',
  templateUrl: 'views/item.component.html',
  styleUrls: ['views/item.component.css'],
})

export default class ItemComponent {
  @Input() user: UserModel;

  constructor() {
    this.user = new UserModel(null);
  }
}

