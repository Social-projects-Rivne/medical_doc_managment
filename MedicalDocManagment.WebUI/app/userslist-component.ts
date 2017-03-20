import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { HttpService } from './http-service';

import UserModel from './models/usermodel';

import { UsersListItemComponent } from './userslist-item-component';
import { UsersListPaginationComponent } from './userslist-pagination-component';

@Component({
  selector: 'usersList',
  templateUrl: './app/views/userslist-component.html',
  providers: [HttpService]
})

export class UsersListComponent {
  users: Array<UserModel>;

  constructor(private httpService: HttpService) { }
  ngOnInit() {
    this.getUsersList();
  }

  getUsersList(): void {
    this.httpService.getUsersList().subscribe((data: Response) => { this.users = data.json(); });
  }

}

