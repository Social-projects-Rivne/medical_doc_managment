import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';

import { AdminHttpFacade } from './admin-http.facade';
import UserModel from './models/user.model';
import UsersModel from './models/users.model';
import UserSearchModel from './models/user-search.model';
import { UsersSearchOptionsEnum } from './users-search-options.enum';

@Component({
  moduleId: module.id,
  selector: 'users-search-Form',
  templateUrl: 'views/users-search-form.component.html',
  providers: [AdminHttpFacade]
})

export class UsersSearchFormComponent {
  // next is declared in such way so that enum can be used in template
  UsersSearchOptionsEnum = UsersSearchOptionsEnum;

  private _isErrorOnSearching: boolean;
  private _isSearching: boolean;
  private _adminHttpFacade: AdminHttpFacade;
  private _lastErrorMessage: string;
  private _searchOption: UsersSearchOptionsEnum;
  private _searchResult: UsersModel;
  private  _userToSearchFor: UserSearchModel;

  constructor(adminHttpFacade: AdminHttpFacade) {
    this._isErrorOnSearching = false;
    this._isSearching = false;
    this._lastErrorMessage = '';
    this._searchResult = null;
    this._searchOption = UsersSearchOptionsEnum.byUsername;
    this._userToSearchFor = new UserSearchModel();

    this._adminHttpFacade = adminHttpFacade;
  }

  search(): void {
    this._isSearching = true;
    this._isErrorOnSearching = false;
    this._searchResult = null;
    switch (this._searchOption) {
      case UsersSearchOptionsEnum.byPositionName:
        this._searchByPositionName();
        break;
      case UsersSearchOptionsEnum.byStatus:
        this._searchByStatus();
        break;
      case UsersSearchOptionsEnum.byUsername:
        this._searchByUsername();
        break;
    }
  }

  private _handleSearchError(error: any) {
    this._isSearching = false;
    this._isErrorOnSearching = true;
    this._lastErrorMessage = 'При пошуку виникла помилка: \r\n' + <any>error;
  }

  private _searchByPositionName(): void {
    this._adminHttpFacade.searchUsersByPositionName(this._userToSearchFor.positionName)
      .subscribe((data: UsersModel) => {
        this._searchResult = data;
        this._isSearching = false;
      },
        error => { this._handleSearchError(error); });
  }

  private _searchByStatus(): void {
    this._adminHttpFacade.searchUsersByStatus(this._userToSearchFor.isActive)
      .subscribe((data: UsersModel) => {
        this._searchResult = data;
        this._isSearching = false;
      },
        error => { this._handleSearchError(error); });
  }

  private _searchByUsername(): void {
    this._adminHttpFacade.searchUserByUsername(this._userToSearchFor.username)
      .subscribe((result: UserModel) => {
        this._searchResult = new UsersModel(null);
        this._searchResult.push(result);
        this._isSearching = false;
      },
      error => { this._handleSearchError(error); });
  }
}

