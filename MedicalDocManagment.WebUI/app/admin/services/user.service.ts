import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'

import { AuthenticationService } from "../../shared/authentication.service";

import { User } from '../models/user';
import PositionModel from "../models/positionmodel";

@Injectable()
export class UserService {
    private headers: Headers;

    constructor(private http: Http, private authenticationService: AuthenticationService) {
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        this.headers.append('Authorization', 'Bearer ' + authenticationService.token);
    }

    postData(obj: User) {
        const body = JSON.stringify(obj);
        let headers = this.headers;
        return this.http.post('/api/Admin/AddUser', body, { headers: headers })
                        .map((resp: Response) => resp.json())
                        .catch((error: any) => { return Observable.throw(error); });
    }
    getPositionsList(): Observable<PositionModel[]> {
        let headers = this.headers;
        return this.http.get('/api/Admin/GetPositions', { headers: headers })
                        .map((resp: Response) => resp.json())
                        .catch((error: any) => { return Observable.throw(error); });
    }
}