import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';

import { HttpFacade } from '../http.facade';

import PageComponent from './page/page.component';
import PaginationComponent from './pagination.component';
import UsersModel from '../models/users.model';

@Component({
  moduleId: module.id,
  selector: 'usersList',
  templateUrl: 'views/users-list.component.html',
  styleUrls: ['views/users-list.component.css'],
  providers: [HttpFacade]
})

export class UsersListComponent {
  @Input() users: UsersModel;

  private _httpFacade: HttpFacade;

  constructor(httpFacade: HttpFacade) {
    this._httpFacade = httpFacade;
    this.users = new UsersModel(null);
  }

  getUsersFromServer(): void {
    this._httpFacade.getUsersList()
      .subscribe((data: UsersModel) => { this.users = data; });
  }
}

