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

@Injectable()
export class HttpFacade {
  private _http: Http;

  constructor(http: Http) {
    this._http = http;
  }

  deleteUser(user: UserModel): Observable<boolean> {
    return this._http.delete('/api/Admin/DeleteUser?id=' + user.id)
                     .map((resp: Response) => { return resp.ok; })
                     .catch((error: any) => { return Observable.throw(error); });
  }

  getUsersList(): Observable<UsersModel> {
    return this._http.get('/api/Admin/GetUsers')
                     .map((resp: Response) => { return new UsersModel(resp.json()); } )
                     .catch((error: any) => { return Observable.throw(error); });
  }

}