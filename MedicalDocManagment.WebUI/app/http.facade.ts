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

  deleteUser(user: UserModel): void {
    console.log('Trying to delete user with id ' + user.id);
    this._http.delete('/api/Admin/DeleteUser?id=' + user.id)
              .subscribe((ok) => { console.log(); });
  }

  getUsersList(): Observable<UsersModel> {
    return this._http.get('/api/Admin/GetUsers')
                     .map((resp: Response) => { return new UsersModel(resp.json()); } )
                     .catch((error: any) => { return Observable.throw(error); });
  }

}