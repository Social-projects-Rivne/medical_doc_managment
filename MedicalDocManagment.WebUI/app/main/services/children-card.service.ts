import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'

import ChildCardModel from '../models/child-card.model';
import ChildrenCardsModel from '../models/children-cards.model';
import ParentModel from '../models/parent.model';

// import { AuthenticationService } from '../login/authentication.service';

@Injectable()
export default class ChildrensCardService {
    private _apiUrl: string = '/api/childcards';
    private _headers: Headers;
    private childrenCardsList: ChildCardModel[] = [
        new ChildCardModel({ id: 1, firstName: 'Ім\'я', secondName: 'По батькові', lastName: 'Прізвище', date: new Date(1999, 1), address: 'Rivne', checkIn: new Date(2000, 1), checkOut: new Date(2017, 1), diagnosis: { id: 'A00.1', name: 'A00.1' }, prescription: "rescription" }),
        new ChildCardModel({ id: 1, firstName: 'Ім\'я', secondName: 'По батькові', lastName: 'Прізвище', date: new Date(1999, 1), address: 'Rivne', checkIn: new Date(2000, 1), checkOut: new Date(2017, 1), diagnosis: { id: 'A00.1', name: 'A00.1' }, prescription: "rescription" }),
        new ChildCardModel({ id: 1, firstName: 'Ім\'я', secondName: 'По батькові', lastName: 'Прізвище', date: new Date(1999, 1), address: 'Rivne', checkIn: new Date(2000, 1), checkOut: new Date(2017, 1), diagnosis: { id: 'A00.1', name: 'A00.1' }, prescription: "rescription" }),
        new ChildCardModel({ id: 1, firstName: 'Ім\'я', secondName: 'По батькові', lastName: 'Прізвище', date: new Date(1999, 1), address: 'Rivne', checkIn: new Date(2000, 1), checkOut: new Date(2017, 1), diagnosis: { id: 'A00.1', name: 'A00.1' }, prescription: "rescription" }),
        new ChildCardModel({ id: 1, firstName: 'Ім\'я', secondName: 'По батькові', lastName: 'Прізвище', date: new Date(1999, 1), address: 'Rivne', checkIn: new Date(2000, 1), checkOut: new Date(2017, 1), diagnosis: { id: 'A00.1', name: 'A00.1' }, prescription: "rescription" }),
    ];
    private headers: Headers;

    constructor(private _http: Http) {
        // constructor(private http: Http, private authenticationService: AuthenticationService) {
        this._headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        // this.headers.append('Authorization', 'Bearer ' + authenticationService.token);
    }
    
    addChildrenCard(childrensCard: ChildCardModel): boolean {
        if (childrensCard) {
            this.childrenCardsList.push(childrensCard);
            console.log(childrensCard);

            return true;
        }

        return false;
    }
}