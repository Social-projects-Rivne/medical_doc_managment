import { Injectable} from '@angular/core';
import { Http} from '@angular/http';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'

import ChildCardModel from '../models/child-card.model';
import ParentModel from '../models/parent.model';

// import { AuthenticationService } from '../login/authentication.service';

@Injectable()
export default class ChildrensCardService {
    private childrenCardsList:ChildCardModel[] = [
        new ChildCardModel({id:1,firstName: 'Ім\'я',secondName:'По батькові',lastName: 'Прізвище',date: new Date(1999,1),address: 'Rivne',checkIn: new Date(2000,1),checkOut: new Date(2017,1),diagnosis: {id:'A00.1', name:'A00.1'},prescription:"rescription"}),
        new ChildCardModel({id:1,firstName: 'Ім\'я',secondName:'По батькові',lastName: 'Прізвище',date: new Date(1999,1),address: 'Rivne',checkIn: new Date(2000,1),checkOut: new Date(2017,1),diagnosis: {id:'A00.1', name:'A00.1'},prescription:"rescription"}),
        new ChildCardModel({id:1,firstName: 'Ім\'я',secondName:'По батькові',lastName: 'Прізвище',date: new Date(1999,1),address: 'Rivne',checkIn: new Date(2000,1),checkOut: new Date(2017,1),diagnosis: {id:'A00.1', name:'A00.1'},prescription:"rescription"}),
        new ChildCardModel({id:1,firstName: 'Ім\'я',secondName:'По батькові',lastName: 'Прізвище',date: new Date(1999,1),address: 'Rivne',checkIn: new Date(2000,1),checkOut: new Date(2017,1),diagnosis: {id:'A00.1', name:'A00.1'},prescription:"rescription"}),
        new ChildCardModel({id:1,firstName: 'Ім\'я',secondName:'По батькові',lastName: 'Прізвище',date: new Date(1999,1),address: 'Rivne',checkIn: new Date(2000,1),checkOut: new Date(2017,1),diagnosis: {id:'A00.1', name:'A00.1'},prescription:"rescription"}),
    ];
    private headers: Headers;

    constructor(private http: Http) {
    // constructor(private http: Http, private authenticationService: AuthenticationService) {
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        // this.headers.append('Authorization', 'Bearer ' + authenticationService.token);
    }

    getChildrensCards(): ChildCardModel[]{
        return this.childrenCardsList;
    }

    addChildrenCard(childrensCard: ChildCardModel): boolean {
        if(childrensCard){
            this.childrenCardsList.push(childrensCard);
            return true;
        } else {
            return false;
        }
    }
}