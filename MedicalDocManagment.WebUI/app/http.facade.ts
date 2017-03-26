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
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import UsersModel from './models/users.model';
import UserSearchModel from './models/user-search.model';

@Injectable()
export class HttpFacade {
  private _http: Http;

  constructor(http: Http) {
    this._http = http;
  }

  getUsersList(): Observable<UsersModel> {
    return this._http.get('/api/Admin/GetUsers')
                     .map((resp: Response) => { return new UsersModel(resp.json()); } )
                     .catch((error: any) => { return Observable.throw(error); });
  }

  searchForUser(user: UserSearchModel): Observable<UsersModel> {
    console.log(user);
    return this._http.get('/api/Admin/SearchForUser?user=' + JSON.stringify(user))
                     .map((resp: Response) => { return new UsersModel(resp.json()); })
                     .catch((error: any) => { return Observable.throw(error); });
  }
}