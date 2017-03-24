import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { HttpFacade } from '../http.facade';

import PageComponent from './page/page.component';
import PaginationComponent from './pagination.component';
import UsersModel from '../models/usersmodel';

@Component({
  moduleId: module.id,
  selector: 'usersList',
  templateUrl: 'views/users-list.component.html',
  styleUrls: ['views/users-list.component.css'],
  providers: [HttpFacade]
})

/**
 * Class, which implements users list feature.
 */
export class UsersListComponent {
  users: UsersModel;

  private _httpFacade: HttpFacade;

  constructor(httpFacade: HttpFacade) {
    this._httpFacade = httpFacade;
    this.users = new UsersModel(null);
    this.updateUsersList();
  }

  updateUsersList(): void {
    this._httpFacade.getUsersList()
                    .subscribe((data: UsersModel) => { this.users = data; });
  }
}

