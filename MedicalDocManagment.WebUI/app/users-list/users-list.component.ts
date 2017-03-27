import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';

import { AdminHttpFacade } from '../admin-http.facade';

import PageComponent from './page/page.component';
import PaginationComponent from './pagination.component';
import UsersModel from '../models/users.model';

@Component({
  moduleId: module.id,
  selector: 'usersList',
  templateUrl: 'views/users-list.component.html',
  styleUrls: ['views/users-list.component.css'],
  providers: [AdminHttpFacade]
})

export class UsersListComponent {
  @Input() users: UsersModel;

  private _adminHttpFacade: AdminHttpFacade;

  constructor(adminHttpFacade: AdminHttpFacade) {
    this._adminHttpFacade = adminHttpFacade;
    this.users = new UsersModel(null);
  }

  getUsersFromServer(): void {
    this._adminHttpFacade.getUsersList()
      .subscribe((data: UsersModel) => { this.users = data; });
  }
}

