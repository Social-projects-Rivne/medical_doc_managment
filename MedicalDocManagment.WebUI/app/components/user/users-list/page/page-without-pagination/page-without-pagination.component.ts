import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';

import ItemComponent from '../item/item.component';
import UsersModel from '../../../../../models/usersmodel';

@Component({
  moduleId: module.id,
  selector: 'page-without-pagination',
  templateUrl: 'page-without-pagination.component.html'
})
export default class PageWithoutPaginationComponent {
  @Input() users: UsersModel;
  @Output() onUsersListEdit = new EventEmitter<string>();

  constructor() {
    //this.users = new UsersModel(null);
  }
  onPageEdit(id: string) {
    this.onUsersListEdit.emit(id);
  }
}
