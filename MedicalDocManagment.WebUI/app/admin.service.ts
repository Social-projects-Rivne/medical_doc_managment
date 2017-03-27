import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import UserModel from './models/user.model';
import UsersModel from './models/users.model';

@Injectable()
export class AdminService {
  private _http: Http;

  constructor(http: Http) {
    this._http = http;
  }

  getUsersList(): Observable<UsersModel> {
    return this._http.get('/api/Admin/GetUsers')
                     .map((resp: Response) => { return new UsersModel(resp.json()); } )
                     .catch((error: any) => { return Observable.throw(error); });
  }

  searchUsersByPositionName(positionName: string): Observable<UsersModel> {
    return this._http.get('/api/Admin/GetUsersByPosition?positionName=' + positionName)
                     .map((resp: Response) => { return new UsersModel(resp.json()); })
                     .catch((error: any) => { return Observable.throw(error); });
  }

  searchUsersByStatus(status: boolean): Observable<UsersModel> {
    return this._http.get('/api/Admin/GetUsersByStatus?userStatus=' + status)
                     .map((resp: Response) => { return new UsersModel(resp.json()); })
                     .catch((error: any) => { return Observable.throw(error); });
  }

  searchUserByUsername(username: string): Observable<UserModel> {
    return this._http.get('/api/Admin/GetUserByName?userName=' + username)
                     .map((resp: Response) => { return new UserModel(resp.json()); })
                     .catch((error: any) => { return Observable.throw(error); });
  }
}