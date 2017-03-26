import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';

import { HttpFacade } from './http.facade';
import UserSearchModel from './models/user-search.model';
import UsersModel from './models/users.model';

@Component({
  moduleId: module.id,
  selector: 'users-search-Form',
  templateUrl: 'views/users-search-form.component.html',
  providers: [HttpFacade]
})

export class UsersSearchFormComponent {
  isErrorOnSearching: boolean;
  isSearching: boolean;
  lastErrorMessage: string;
  searchResult: UsersModel;
  userToSearchFor: UserSearchModel;

  private _httpFacade: HttpFacade;

  constructor(httpFacade: HttpFacade) {
    this.isErrorOnSearching = false;
    this.isSearching = false;
    this.lastErrorMessage = '';
    this.searchResult = null;
    this.userToSearchFor = new UserSearchModel();

    this._httpFacade = httpFacade;
  }

  search(): void {
    this.isSearching = true;
    this.isErrorOnSearching = false;
    this._httpFacade.searchForUser(this.userToSearchFor)
                    .subscribe((data: UsersModel) => {
                      this.searchResult = data;
                      this.isSearching = false;
                    },
                    error => {
                      this.isSearching = false;
                      this.isErrorOnSearching = true;
                      this.lastErrorMessage = 'При пошуку виникла помилка: \r\n'+<any>error;
                    });
  }
}

