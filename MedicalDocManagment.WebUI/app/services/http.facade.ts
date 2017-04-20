import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthenticationService } from './authentication.service';

import UserModel from "../models/usermodel";
import UsersModel from "../models/usersmodel";
import PositionModel from "../models/positionmodel";
import PagedResponseModel from "../models/paged-response-model";

@Injectable()
export class HttpFacade {
    private _http: Http;
    private headers: Headers;

    constructor(http: Http, private authenticationService: AuthenticationService) {
        this._http = http;
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        this.headers.append('Authorization', 'Bearer ' + authenticationService.token);
    }

    updateUser(user: UserModel) {
        const jsonBody = JSON.stringify(user);
        let headers = this.headers;
        return this._http.put('/api/admin/edituser/' + user.id, jsonBody, { headers })
            .map((resp: Response) => { return resp; })
            .catch((error: any) => { return Observable.throw(error); });
    }
    searchUsersByPositionName(positionName: string): Observable<UsersModel> {
        let headers = this.headers;
        return this._http.get('/api/Admin/GetUsersByPosition?positionName=' + positionName, { headers })
                       .map((resp: Response) => {
                           return ((resp.text()) ? new UsersModel(resp.json()) : null);
                       })
                       .catch((error: any) => {
                           if (error instanceof Response) {
                               if (error.status == 404) {
                                   return Observable.of(null);
                               }
                           }
                           else {
                               return Observable.throw(error);
                           }
                       });
    }

    searchUsersByStatus(status: boolean): Observable<UsersModel> {
        let headers = this.headers;
        return this._http.get('/api/Admin/GetUsersByStatus?userStatus=' + status, { headers })
                       .map((resp: Response) => {
                           return ((resp.text()) ? new UsersModel(resp.json()) : null);
                       })
                       .catch((error: any) => {
                           if (error instanceof Response) {
                               if (error.status == 404) {
                                   return Observable.of(null);
                               }
                           }
                           else {
                               return Observable.throw(error);
                           }
                       });
    }

    searchUserByUsername(username: string): Observable<UserModel> {
        let headers = this.headers;
        return this._http.get('/api/Admin/GetUserByName?userName=' + username, { headers })
                       .map((resp: Response) => {
                           return ((resp.text()) ? new UserModel(resp.json()) : null);
                       })
                       .catch((error: any) => {
                           if (error instanceof Response) {
                               if (error.status == 404) {
                                   return Observable.of(null);
                               }
                           }
                           else {
                               return Observable.throw(error);
                           }
                       });
    }

    getPositionsList(): Observable<PositionModel[]> {
        let headers = this.headers;
        return this._http.get('/api/Admin/GetPositions', { headers })
                         .map((resp: Response) => resp.json())
                         .catch((error: any) => { return Observable.throw(error); });
    }

    getUserById(id: string): Observable<UserModel> {
        let headers = this.headers;
        return this._http.get('/api/admin/getuser?id=' + id, { headers })
                         .map((resp: Response) => { return new UserModel(resp.json()); })
                         .catch((error: any) => { return Observable.throw(error); })
    }

    deleteUser(user: UserModel): Observable<boolean> {
        let headers = this.headers;
        return this._http.delete('/api/Admin/DeleteUser?id=' + user.id, { headers })
                         .map((resp: Response) => { return resp.ok; })
                         .catch((error: any) => { return Observable.throw(error); });
    }

    getUsersList(): Observable<UsersModel> {
        let headers = this.headers;
        return this._http.get('/api/Admin/GetUsers', { headers })
                         .map((resp: Response) => { return new UsersModel(resp.json()); })
                         .catch((error: any) => { return Observable.throw(error); });
    }

    getUsersListPaged(page: number, pageSize: number): Observable<PagedResponseModel> {
       // let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        
        //let tokenInFacade = JSON.parse(localStorage.getItem('currentUser')).token;
        //console.log(tokenInFacade);
       // headers.append('Authorization', 'Bearer ' + tokenInFacade);
        //headers.append('Authorization', `Bearer ${authToken}`);
        let headers = this.headers;
        return this._http.get("api/admin/getpaged?pageNumber=" + page + "&pageSize=" + pageSize, { headers })
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