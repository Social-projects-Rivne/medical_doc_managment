/**
 * @fileoverview This file defines HttpFacade — component, which provides interaction between
 *     front-end side and back-end side via HTTP requests.   
 * @author Rv-023.Net
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import UserModel from './models/usermodel';
import UsersModel from './models/usersmodel';
import PositionModel from './models/positionmodel';
import PagedResponseModel from './models/paged-response-model';

@Injectable()
export class HttpFacade {
    private _http: Http;

    constructor(http: Http) {
        this._http = http;
    }

    updateUser(user: UserModel) {
        const jsonBody = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this._http.put('/api/admin/edituser/' + user.id, jsonBody, { headers })
                         .map((resp: Response) => { return resp; })
                         .catch((error: any) => { return Observable.throw(error); });
    }

    getPositionsList(): Observable<PositionModel[]> {
        return this._http.get('/api/Admin/GetPositions')
                         .map((resp: Response) => resp.json())
                         .catch((error: any) => { return Observable.throw(error); });
    }

    getUserById(id: string): Observable<UserModel> {
        return this._http.get('/api/admin/getuser?id=' + id)
                         .map((resp: Response) => { return new UserModel(resp.json()); })
                         .catch((error: any) => { return Observable.throw(error); })
    }

    deleteUser(user: UserModel): Observable<boolean> {
        return this._http.delete('/api/Admin/DeleteUser?id=' + user.id)
                         .map((resp: Response) => { return resp.ok; })
                         .catch((error: any) => { return Observable.throw(error); });
    }

    getUsersList(): Observable<UsersModel> {
        return this._http.get('/api/Admin/GetUsers')
                         .map((resp: Response) => { return new UsersModel(resp.json()); })
                         .catch((error: any) => { return Observable.throw(error); });
    }

    getUsersListPaged(page: number, pageSize: number): Observable<PagedResponseModel> {
        return this._http.get("api/admin/getpaged?pageNumber=" + page + "&pageSize=" + pageSize)
                         .map((resp: Response) => {
                             let pagedResponse: PagedResponseModel = new PagedResponseModel();
                             pagedResponse.pageCount = resp.json().paging.pageCount;
                             pagedResponse.pageNumber = resp.json().paging.pageNumber;
                             pagedResponse.pageSize = resp.json().paging.pageSize;
                             pagedResponse.totalRecordCount = resp.json().paging.totalRecordCount;
                             pagedResponse.users = new UsersModel(resp.json().data);
                             return pagedResponse;
                         })
                         .catch((error: any) => { return Observable.throw(error); });
    }
}