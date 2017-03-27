import {ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do'
import UserModel from '../models/usermodel';
@Component({
    selector: 'app-users-list-paginate',
    templateUrl: 'app/users-list-paginate/users-list-paginate.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListPaginateComponent implements OnInit {
    private _data: Observable<UserModel[]>;
    private _page: number = 1;
    private _pageSize: number = 5;
    private _total: number;

    constructor(private _http: Http) {

    }
    ngOnInit() {
        this.getPage(1);
    }
    getPage(page: number) {
        this._data = this._http.get("api/admin/getpaged?pageNumber=" + page + "&pageSize=" + this._pageSize)
            .do((res: any) => {
                this._total = res.json().Paging.TotalRecordCount;
                this._page = res.json().Paging.PageNumber;
            })
            .map((res: any) => {
                let usersList = res.json().Data;
                let users: UserModel[] = [];
                for (let index in usersList) {
                    let user: UserModel = new UserModel(usersList[index]);
                    users.push(user);
                }
                return users;
            });
    }
}