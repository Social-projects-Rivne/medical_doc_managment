import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import ChildrenCardsModel from './models/children-cards.model';
import ParentModel from './models/parent.model';
import ViewPatientDataModel from './models/view-patient-data.model';

/**
 * Class is a mockup for class MainHttpFacade from file 'main-http.facade'.
 */
@Injectable()
export class MainHttpFacade {
    /**
     * Method sends to server request for adding new parent.
     * @param {ParentModel} parent Contains data about parent to add
     * @return {Observable<ParentModel>} Model, which contains added data of parent.
     */
    addParent(parent: ParentModel): Observable<ParentModel> {
        return null;
    }

    getChildrenCards(): Observable<ChildrenCardsModel> {
        let childrenCardsJsonString: string = '[' +
            '{ "id":"1", "f_name":"Іван", "s_name":"Петрович", "l_name":"Сидорчук",' +
            '"date":"04.03.2001", "address":"м.Рівне, вул. ...", "checkin":"02.04.2017",' +
            '"checkout":"16.04.2017", "diagnosis": {"id":"1","name":"сколіоз"},' +
            '"prescription":"лікування"},' +
            '{ "id":"1", "f_name":"Іван", "s_name":"Петрович", "l_name":"Сидорчук",' +
            '"date":"04.03.2001", "address":"м.Рівне, вул. ...", "checkin":"02.04.2017",' +
            '"checkout":"16.04.2017", "diagnosis": {"id":"1","name":"сколіоз"},' +
            '"prescription":"лікування"},' +
            '{ "id":"1", "f_name":"Іван", "s_name":"Петрович", "l_name":"Сидорчук",' +
            '"date":"04.03.2001", "address":"м.Рівне, вул. ...", "checkin":"02.04.2017",' +
            '"checkout":"16.04.2017", "diagnosis": {"id":"1","name":"сколіоз"},' +
            '"prescription":"лікування"}' +
            ']';
        return Observable.of(new ChildrenCardsModel(JSON.parse(childrenCardsJsonString)));
    }

    /**
     * Method returns some patient data
     * @param {ViewPatientDataModel} viewPatientDataModel Contains data about patient to view
     * @return {Observable<ChildrenCardsModel>} Contains data about patients
     */
    viewPatientData(viewPatientDataModel: ViewPatientDataModel): Observable<ChildrenCardsModel>
    {
        let childrenCardsJsonString: string = '[' +
            '{ "id":"1", "f_name":"Іван", "s_name":"Петрович", "l_name":"Сидорчук",' +
            '"date":"04.03.2001", "address":"м.Рівне, вул. ...", "checkin":"02.04.2017",' +
            '"checkout":"16.04.2017", "diagnosis": {"id":"1","name":"діагноз 1"},' +
            '"prescription":"лікування 1"},' +
            '{ "id":"1", "f_name":"Іван", "s_name":"Петрович", "l_name":"Сидорчук",' +
            '"date":"04.03.2001", "address":"м.Рівне, вул. ...", "checkin":"02.04.2017",' +
            '"checkout":"16.04.2017", "diagnosis": {"id":"2","name":"діагноз 2"},' +
            '"prescription":"лікування 2"},' +
            '{ "id":"1", "f_name":"Іван", "s_name":"Петрович", "l_name":"Сидорчук",' +
            '"date":"04.03.2001", "address":"м.Рівне, вул. ...", "checkin":"02.04.2017",' +
            '"checkout":"16.04.2017", "diagnosis": {"id":"3","name":"діагноз 3"},' +
            '"prescription":"лікування 3"}' +
            ']';
        return Observable.of(new ChildrenCardsModel(JSON.parse(childrenCardsJsonString)));
    }
}