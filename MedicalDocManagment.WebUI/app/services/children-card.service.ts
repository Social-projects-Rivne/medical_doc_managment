import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import ChildCardModel from '../models/child-card.model';
import ChildrenCardsModel from '../models/children-cards.model';
import ParentModel from '../models/parent.model';
import { AuthenticationService } from "./authentication.service";

@Injectable()
export default class ChildrensCardService {
    private headers: Headers;

    constructor(private http: Http, @Inject(AuthenticationService) private _authenticationService: AuthenticationService) {
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        this.headers.append('Authorization', 'Bearer ' + this._authenticationService.token);
    }

    addChildrenCard(obj: ChildCardModel) {
        const body = JSON.stringify(obj);
        let headers = this.headers;
        return this.http.post('/api/childcards/addpatient', body, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    /**
     * Method sends to server request for adding new parent.
     * @param {ParentModel} parent Contains data about parent to add
     * @return {Observable<ParentModel>} Model, which contains added data of parent.
     */
    addParent(parent: ParentModel): Observable<ParentModel> {
        let body:string = JSON.stringify(parent);
        let headers = this.headers;
        return this.http.post('/api/childcards/addparent', body, { headers: headers })
            .map((resp: Response) => {
                Observable.of(new ParentModel(resp.json()));
            })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getChildrenCards(): Observable<ChildrenCardsModel> {
        let headers = this.headers;
        return this.http.get('/api/childcards/GetChildrenCards', { headers })
           .map((resp: Response) => { return new ChildrenCardsModel(resp.json()); })
           .catch((error: any) => { return Observable.throw(error); });
    }

}
