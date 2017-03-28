/**
 * @fileoverview This file defines UsersListComponent — component, which implements users list feature.
 * @author andriy_katsubo@ukr.net (Andriy Katsubo)
 */
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpFacade } from '../http.facade';

import PageComponent from './page/page.component';
import UsersModel from '../models/usersmodel';
import UserModel from '../models/usersmodel';

@Component({
    moduleId: module.id,
    selector: 'usersList',
    templateUrl: 'views/users-list.component.html',
    styleUrls: ['views/users-list.component.css'],
    providers: [HttpFacade]
})

/**
 * Class, which implements users list feature.
 */
export class UsersListComponent {
    users: Observable<UsersModel>;
    userForEdit: UserModel;
    page: number = 1;
    pageSize: number = 5;
    total: number;

    private _httpFacade: HttpFacade;

    constructor(httpFacade: HttpFacade) {
        this._httpFacade = httpFacade;
        this.userForEdit = new UserModel(null);
    }

    onUsersListEdit(id: string) {
        this._httpFacade.getUserById(id)
            .subscribe((data: any) => { this.userForEdit = data; });
    }

    ngOnInit() {
        this.getPage(1, this.pageSize);
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
            .map(data => { return data.Users; });
    }

}

