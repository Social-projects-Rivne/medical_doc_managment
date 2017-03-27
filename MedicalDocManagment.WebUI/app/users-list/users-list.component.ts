import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';

import { AdminService } from '../admin.service';

import PageComponent from './page/page.component';
import PaginationComponent from './pagination.component';
import UsersModel from '../models/users.model';

@Component({
  moduleId: module.id,
  selector: 'usersList',
  templateUrl: 'views/users-list.component.html',
  styleUrls: ['views/users-list.component.css'],
  providers: [AdminService]
})

export class UsersListComponent {
  @Input() users: UsersModel;

  private _adminService: AdminService;

  constructor(adminService: AdminService) {
    this._adminService = adminService;
    this.users = new UsersModel(null);
  }

  getUsersFromServer(): void {
    this._adminService.getUsersList()
      .subscribe((data: UsersModel) => { this.users = data; });
  }
}

