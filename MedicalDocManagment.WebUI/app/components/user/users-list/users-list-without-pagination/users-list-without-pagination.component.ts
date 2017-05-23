import { Component, Input, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpFacade } from '../../../../services/http.facade';
import {NotificationsService, SimpleNotificationsComponent} from 'angular2-notifications';

import PageWithoutPaginationComponent from '../page/page-without-pagination/page-without-pagination.component';
import UsersModel from '../../../../models/usersmodel';
import UserModel from '../../../../models/usermodel';

@Component({
  moduleId: module.id,
  selector: 'users-list-without-pagination',
  templateUrl: 'users-list-without-pagination.component.html',
  providers: [HttpFacade, NotificationsService]
})
export default class UsersListWithoutPaginationComponent {
  @Input() users: Observable<UsersModel>;
  userForEdit: UserModel;
  tempUserForEdit: UserModel;
  private _httpFacade: HttpFacade;

  constructor(httpFacade: HttpFacade) {
    this._httpFacade = httpFacade;
    this.tempUserForEdit = new UserModel();
  }

  onUsersListEdit(userForEdit: UserModel) {
      this.userForEdit = userForEdit;
      this.tempUserForEdit.clone(userForEdit);
  }

  updateUsersList(): void {
    this.users = this._httpFacade.getUsersList();
  }
}

