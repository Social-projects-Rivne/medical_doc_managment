import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/observable/of';

import { HttpFacade } from '../http.facade';
import PositionModel from '../models/positionmodel';
import UserModel from '../models/usermodel';
import UsersModel from '../models/usersmodel';
import UserSearchModel from '../models/user-search.model';
import { UserService } from '../user-add/user.service';
import { UsersSearchOptionsEnum } from './users-search-options.enum';

@Component({
    moduleId: module.id,
    selector: 'users-search-form',
    templateUrl: 'views/users-search-form.component.html',
    providers: [HttpFacade, UserService]
})

export class UsersSearchFormComponent {
    // next is declared in such way so that enum can be used in template
    UsersSearchOptionsEnum = UsersSearchOptionsEnum;

    private _isErrorOnSearching: boolean;
    private _isNotFound: boolean;
    private _isSearching: boolean;
    private _httpFacade: HttpFacade;
    private _lastErrorMessage: string;
    private _userPositions: PositionModel[];
    private _userService: UserService;
    private _searchOption: UsersSearchOptionsEnum;
    private _searchResult: Observable<UsersModel>;
    private _triedToSearch: boolean;
    private _userToSearchFor: UserSearchModel;

    constructor(httpFacade: HttpFacade, userService: UserService) {
        this._httpFacade = httpFacade;
        this._isErrorOnSearching = false;
        this._isSearching = false;
        this._lastErrorMessage = '';
        this._userPositions = null;
        this._searchResult = null;
        this._searchOption = UsersSearchOptionsEnum.byUsername;
        this._triedToSearch = false;
        this._userService = userService;
        this._userToSearchFor = new UserSearchModel();

        this._getPositionsFromServer();
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

    searchOptionChanged(newSearchOptionValue: UsersSearchOptionsEnum) {
        this._searchOption = newSearchOptionValue;
    }

    private _getPositionsFromServer(): void {
        this._userService.getPositionsList()
            .subscribe((data: PositionModel[]) => { this._userPositions = data; console.log(this._userPositions);});
    }

    private _handleSearchError(error: any) {
        this._isSearching = false;
        this._isErrorOnSearching = true;
        this._lastErrorMessage = 'При пошуку виникла помилка: \r\n' + <any>error;
    }

    private _searchByPositionName(): void {
        this._httpFacade.searchUsersByPositionName(this._userToSearchFor.positionName)
            .subscribe((data: UsersModel) => {
                this._searchResult = data ? Observable.of(data) : null;
                this._isSearching = false;
            },
            (error: any) => { this._handleSearchError(error); });
    }

    private _searchByStatus(): void {
        this._httpFacade.searchUsersByStatus(this._userToSearchFor.isActive)
            .subscribe((data: UsersModel) => {
                this._searchResult = data ? Observable.of(data) : null;
                this._isSearching = false;
            },
            (error: any) => { this._handleSearchError(error); });
    }

    private _searchByUsername(): void {
        this._httpFacade.searchUserByUsername(this._userToSearchFor.username)
            .subscribe((result: UserModel) => {
                if (result) {
                    let users: UsersModel = new UsersModel();
                    users.push(result);
                    this._searchResult = Observable.of(users);
                }
                this._isSearching = false;
            },
            (error: any) => { this._handleSearchError(error); });
    }

    private _validateSearch(): boolean {
        let result: boolean = false;
        switch (this._searchOption) {
            case UsersSearchOptionsEnum.byUsername: {
                result = this._userToSearchFor.username &&
                    this._userToSearchFor.username.trim().length > 0;
                break;
            }
            case UsersSearchOptionsEnum.byPositionName: {
                result = this._userToSearchFor.positionName &&
                    this._userToSearchFor.positionName.trim().length > 0;
                break;
            }
            case UsersSearchOptionsEnum.byStatus: {
                result = true;
                break;
            }
        }

        return result;
    }

}