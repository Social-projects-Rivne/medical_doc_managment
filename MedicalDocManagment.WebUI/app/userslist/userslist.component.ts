/**
 * @fileoverview This file defines UsersListComponent — component, which implements users list feature.
 * @author andriy_katsubo@ukr.net (Andriy Katsubo)
 */
import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { HttpFacade } from '../http.facade';
import { UsersListItemComponent } from './userslist-item.component';
import { UsersListPaginationComponent } from './userslist-pagination.component';
import UserModel from '../models/usermodel';

@Component({
  moduleId: module.id,
  selector: 'usersList',
  templateUrl: './views/userslist.component.html',
  styleUrls: ['./views/userslist.component.css'],
  providers: [HttpFacade]
})

/**
 * Class, which implements users list feature.
 */
export class UsersListComponent {
  /**
   * Array, which contains users, which are displayed in list.
   * @private {UserModel[]}
   */
  private _users: UserModel[];
  /**
   * HttpService component via which this class acquire data for list of users.
   * @private {HttpService}
   */
  private _httpFacade: HttpFacade;

  /**
   * Constructor initializes value of _httpService property and updates users list.
   * @param {HttpService} httpService HttpService object via which this class can interact with server.
   * @constructor
   */
  constructor(httpService: HttpFacade) {
    this._httpFacade = httpService;
    this.updateUsersList();
  }

  /**
   * Method acquires list of users from HttpService and writes it into _users property.
   */
  updateUsersList(): void {
    this._httpFacade.getUsersList()
                    .subscribe((data: UserModel[]) => { this._users = data; });
  }

}

