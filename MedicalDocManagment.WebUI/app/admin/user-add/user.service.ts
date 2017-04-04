import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers, URLSearchParams} from '@angular/http';
import {User} from './user';
import PositionModel from '../models/positionmodel';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'


@Injectable()
export class UserService {

    constructor(private http: Http) { }

    postData(obj: User) {
        const body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('/api/Admin/AddUser', body, { headers: headers })
                        .map((resp: Response) => resp.json())
                        .catch((error: any) => { return Observable.throw(error); });
    }
    getPositionsList(): Observable<PositionModel[]> {
        return this.http.get('/api/Admin/GetPositions')
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }
}