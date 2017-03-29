import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpFacade } from '../http.facade';

import PageComponent from './page/page.component';
import UsersModel from '../models/usersmodel';

@Component({
  moduleId: module.id,
  selector: 'usersList',
  templateUrl: 'views/users-list.component.html',
  providers: [HttpFacade]
})

export class UsersListComponent {
  users: Observable<UsersModel>;
  page: number = 1;
  pageSize: number = 5;
  total: number;

  private _httpFacade: HttpFacade;

  constructor(httpFacade: HttpFacade) {
    this._httpFacade = httpFacade;
  }

  updateUsersList(): void {
    this.users = this._httpFacade.getUsersList();
  }

  ngOnInit() {
      this.getPage(1,this.pageSize);
  }
 
  onPageChange(page) {
      this.getPage(page, this.pageSize);
  }
  getPage(page: number, pageSize: number) {
      this.users = this._httpFacade.getUsersListPaged(page, pageSize)
                       .do(data => {
                           this.page = data.PageNumber;
                           this.pageSize = data.PageSize;
                           this.total = data.TotalRecordCount;
                       })
                       .map(data => { return data.Users;});
  }
}

