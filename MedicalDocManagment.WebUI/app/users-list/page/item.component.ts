import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';

import ItemActionListComponent from './item-actionlist.component';
import UserModel from '../../models/usermodel'

@Component({
  moduleId: module.id,
  selector: '[item]',
  templateUrl: 'views/item.component.html'
})

export default class ItemComponent {
  @Input() user: UserModel;

  constructor() {
    this.user = new UserModel(null);
  }
}

