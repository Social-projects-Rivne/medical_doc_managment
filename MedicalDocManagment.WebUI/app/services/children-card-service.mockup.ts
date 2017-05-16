import { Injectable } from '@angular/core';
import { Inject } from '@angular/core'; 
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import ChildCardModel from '../models/child-card.model';
import ChildrenCardsModel from '../models/children-cards.model';
import ParentModel from '../models/parent.model';
import ViewPatientDataModel from '../models/view-patient-data.model';

import { AuthenticationService } from "./authentication.service";

/**
 * Class designed to mock-up communication via http with server.   
 */
@Injectable()
export default class ChildrensCardService {
    getChildrenCards(): Observable<ChildrenCardsModel> {        
        let someChildCardJson: string = '{ "id":"1", "firstName":"Іван"\
            , "secondName":"Петрович", "lastName":"Сидорчук",\
            "date":"2001-04-03", "address":"м.Рівне, вул. ...", "checkIn":"2016-04-03",\
            "checkOut":"2016-05-03", "diagnosis": {"id":"1","name":"діагноз 1"},\
            "prescription":"лікування"}';
        let childrenCardsJsonString: string = '[' + someChildCardJson;
        for (let i = 0; i < 6; i++) {
            childrenCardsJsonString += ',' + someChildCardJson;
        }
        let someChildCardJson2: string = '{ "id":"1", "firstName":"Петро"\
            , "secondName":"Іванович", "lastName":"Петренко",\
            "date":"2001-04-03", "address":"м.Рівне, вул. ...", "checkIn":"2016-04-03",\
            "diagnosis": {"id":"2","name":"діагноз 2"}, "prescription":"лікування"}';
        for (let i = 0; i < 6; i++) {
            childrenCardsJsonString += ',' + someChildCardJson2;
        }
        childrenCardsJsonString += ']';
        return Observable.of(new ChildrenCardsModel(JSON.parse(childrenCardsJsonString)));
    }
}
