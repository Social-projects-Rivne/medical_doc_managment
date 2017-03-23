import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';

import ItemComponent from './item.component';
import UserModel from '../../models/usermodel';

@Component({
  moduleId: module.id,
  selector: 'page',
  templateUrl: 'views/page.component.html',
  styleUrls: ['views/page.component.css']
})

export default class PageComponent {
  @Input() users: UserModel[];

  constructor() {
    this.users = [];
  }
}

