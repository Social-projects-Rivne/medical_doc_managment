import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import ChildrenCardsModel from './models/children-cards.model';
import ParentModel from './models/parent.model';
import { AuthenticationService } from '../shared/authentication.service';

@Injectable()
export class MainHttpFacade {
    private _http: Http;
    private headers: Headers;

    constructor(http: Http, private authenticationService: AuthenticationService) {
        this._http = http;
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        this.headers.append('Authorization', 'Bearer ' + authenticationService.token);
    }

    /**
     * Method sends to server request for adding new parent.
     * @param {ParentModel} parent Contains data about parent to add
     * @return {Observable<ParentModel>} Model, which contains added data of parent.
     */
    addParent(parent: ParentModel): Observable<ParentModel> {
        let body:string = JSON.stringify(parent);
        let headers = this.headers;
        return this._http.post('/api/childcards/addparent', body, { headers: headers })
            .map((resp: Response) => {
                Observable.of(new ParentModel(resp.json()));
            })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getChildrenCards(): Observable<ChildrenCardsModel> {
        //let headers = this.headers;
        //return this._http.get('/api/childcards/GetChildrenCards', { headers })
        //    .map((resp: Response) => { return new ChildrenCardsModel(resp.json()); })
        //    .catch((error: any) => { return Observable.throw(error); });
        let childrenCardsJsonString: string = '[' +
            '{ "id":"1", "firstName":"Іван", "secondName":"Петрович", "lastName":"Сидорчук",' +
            '"date":"04.03.2001", "address":"м.Рівне, вул. ...", "checkIn":"02.04.2017",' +
            '"checkOut":"16.04.2017", "diagnosis": {"id":"1","name":"сколіоз"},' +
            '"prescription":"лікування"},' +
            '{ "id":"1", "firstName":"Іван", "secondName":"Петрович", "lastName":"Сидорчук",' +
            '"date":"04.03.2001", "address":"м.Рівне, вул. ...", "checkIn":"02.04.2017",' +
            '"checkOut":"16.04.2017", "diagnosis": {"id":"1","name":"сколіоз"},' +
            '"prescription":"лікування"},' +
            '{ "id":"1", "firstName":"Іван", "secondName":"Петрович", "lastName":"Сидорчук",' +
            '"date":"04.03.2001", "address":"м.Рівне, вул. ...", "checkIn":"02.04.2017",' +
            '"checkOut":"16.04.2017", "diagnosis": {"id":"1","name":"сколіоз"},' +
            '"prescription":"лікування"}' +
            ']';
        return Observable.of(new ChildrenCardsModel(JSON.parse(childrenCardsJsonString)));
    }
}