import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import VisitModel from "../models/visit.model";
import UserModel from "../models/usermodel";
import ChildCardModel from '../models/child-card.model';

import { AuthenticationService } from './authentication.service';

@Injectable()
export default class VisitService {
    private _apiUrl: string = '/api/visits';
    private _headers: Headers;

    constructor(private _http: Http, @Inject(AuthenticationService) private _authenticationService: AuthenticationService) {
        this._headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        this._headers.append('Authorization', 'Bearer ' + this._authenticationService.token);
    }

    createVisit(visitModel: VisitModel): Observable<VisitModel> {
        let headers = this._headers;
        let body = JSON.stringify(visitModel);

        return this._http.post(this._apiUrl + '/createVisit', body, { headers })
            .map((resp: Response) => { return resp.json(); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getVisitsByPatientId(id: number): Observable<VisitModel[]> {
        let headers = this._headers;
        return this._http.get(this._apiUrl + '/getVisitsByPatientId?id=' + id, { headers })
            .map((resp: Response) => { return resp.json(); })
            .catch((error: any) => { return Observable.throw(error); });
    }

}
