import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { HttpFacade } from '../../http.facade';
import { UsersListPageItemComponent } from './userslist-page-item.component';
import UserModel from '../../models/usermodel';

@Component({
  moduleId: module.id,
  selector: 'usersList-Page',
  templateUrl: './views/userslist-page.component.html',
  styleUrls: ['./views/userslist-page.component.css'],
  providers: [HttpFacade]
})

export class UsersListPageComponent {
  private _users: UserModel[];
  private _httpFacade: HttpFacade;

  constructor(httpService: HttpFacade) {
    this._httpFacade = httpService;
    this.updateUsersList();
  }

  updateUsersList(): void {
    this._httpFacade.getUsersList()
      .subscribe((data: UserModel[]) => { this._users = data; });
  }

}

