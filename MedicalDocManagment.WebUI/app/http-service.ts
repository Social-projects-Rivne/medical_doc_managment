import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'

import UserModel from './models/usermodel';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  postData(obj: UserModel) {
    const body = JSON.stringify(obj);
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.http.post('/api/Admin/AddUser', body, { headers: headers })
      .map((resp: Response) => resp.json())
      .catch((error: any) => { return Observable.throw(error); });
  }

  getUsersList(): Observable<Response> {
    return this.http.get('/api/Admin/GetUsers');
  }

}