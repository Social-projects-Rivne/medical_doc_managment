import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';

import { AdminService } from './admin.service';
import UserModel from './models/user.model';
import UsersModel from './models/users.model';
import UserSearchModel from './models/user-search.model';
import { UsersSearchOptionsEnum } from './users-search-options.enum';

@Component({
  moduleId: module.id,
  selector: 'users-search-Form',
  templateUrl: 'views/users-search-form.component.html',
  providers: [AdminService]
})

export class UsersSearchFormComponent {
  // next is declared in such way so that enum can be used in template
  UsersSearchOptionsEnum = UsersSearchOptionsEnum;

  private _isErrorOnSearching: boolean;
  private _isNotFound: boolean;
  private _isSearching: boolean;
  private _adminService: AdminService;
  private _lastErrorMessage: string;
  private _searchOption: UsersSearchOptionsEnum;
  private _searchResult: UsersModel;
  private _triedToSearch: boolean;
  private  _userToSearchFor: UserSearchModel;

  constructor(adminService: AdminService) {
    this._isErrorOnSearching = false;
    this._isSearching = false;
    this._lastErrorMessage = '';
    this._searchResult = null;
    this._searchOption = UsersSearchOptionsEnum.byUsername;
    this._triedToSearch = false;
    this._userToSearchFor = new UserSearchModel();

    this._adminService = adminService;
  }

  search(): void {
    this._isErrorOnSearching = false;
    this._isSearching = true;
    this._searchResult = null;
    this._triedToSearch = true;
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
    this._adminService.searchUsersByPositionName(this._userToSearchFor.positionName)
                      .subscribe((data: UsersModel) => {
                        this._searchResult = data;
                        this._isSearching = false;
                      },
                                 (error:any) => { this._handleSearchError(error); });
  }

  private _searchByStatus(): void {
    this._adminService.searchUsersByStatus(this._userToSearchFor.isActive)
                      .subscribe((data: UsersModel) => {
                        this._searchResult = data;
                        this._isSearching = false;
                      },
                                 (error: any) => { this._handleSearchError(error); });
  }

  private _searchByUsername(): void {
    this._adminService.searchUserByUsername(this._userToSearchFor.username)
                      .subscribe((result: UserModel) => {
                        if (result) {
                          this._searchResult = new UsersModel(null);
                          this._searchResult.push(result);
                        }
                        this._isSearching = false;
                      },
                                 (error: any) => { this._handleSearchError(error); });
  }
}

