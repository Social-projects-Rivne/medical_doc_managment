import { Component, Input, OnInit } from '@angular/core';
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

export class UsersListComponent {
    @Input() users: Observable<UsersModel>;
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

    updateUsersList(): void {
        this.users = this._httpFacade.getUsersList();
    }

    getPage(page: number, pageSize: number) {
        this.users = this._httpFacade.getUsersListPaged(page, pageSize)
                            .do(data => {
                                this.page = data.pageNumber;
                                this.pageSize = data.pageSize;
                                this.total = data.totalRecordCount;
                            })
                            .map(data => { return data.users; });
    }
}

