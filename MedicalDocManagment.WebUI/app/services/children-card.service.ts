import { Injectable } from '@angular/core';
import { Inject } from '@angular/core'; 
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';

import ParentChildCard from '../models/parent-child-card.model';
import ChildCardModel from '../models/child-card.model';
import ChildrenCardsModel from '../models/children-cards.model';
import ParentModel from '../models/parent.model';
import ViewPatientDataModel from '../models/view-patient-data.model';
import ChildrenCardsPagedModel from '../models/children-cards-paged.model';

import { AuthenticationService } from "./authentication.service";

@Injectable()
export default class ChildrensCardService {
    private _apiUrl: string = '/api/childcards';
    private _headers: Headers;
    private _childrenCardsSubject: Subject<any>;

    constructor(private _http: Http, @Inject(AuthenticationService) private _authenticationService: AuthenticationService) {
        this._headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        this._headers.append('Authorization', 'Bearer ' + this._authenticationService.token);
        this._childrenCardsSubject = new Subject<any>();
    }
    
    addChildrenCard(childCard: ChildCardModel): Observable<ChildCardModel> {
        let headers = this._headers;
        let sendObj = {
            lastName: childCard.lastName,
            firstName: childCard.firstName,
            secondName: childCard.secondName,
            date: childCard.date,
            checkin: childCard.checkIn,
            checkout: childCard.checkOut,
            address: childCard.address,
            diagnosisCode: childCard.diagnosis.id,
            prescription: childCard.prescription,
            directedBy: childCard.directedBy,
        };
        let body = JSON.stringify(sendObj);

        return this._http.post(this._apiUrl + '/addpatient', body, { headers })
                         .map((resp: Response) => new ChildCardModel(resp.json()))
                         .catch((error: any) => { return Observable.throw(error); });
    }

    addParentIntoChildCard(parent: ParentModel, childCard: ChildCardModel): Observable<ParentChildCard> {
        let headers = this._headers;
        let sendObj = new ParentChildCard({
            parentId: parent.id,
            childId: childCard.id
        });
        let body = JSON.stringify(sendObj);

        return this._http.post(this._apiUrl + '/addparentintochildcard', body, { headers })
                         .map((resp: Response) => { return new ParentChildCard(resp.json()); })
                         .catch((error: any) => { return Observable.throw(error); });
    }

    /**
     * Method sends to server request for adding new parent.
     * @param {ParentModel} parent Contains data about parent to add
     * @return {Observable<ParentModel>} Model, which contains added data of parent.
     */
    addParent(parent: ParentModel): Observable<ParentModel> {
        let body:string = JSON.stringify(parent);
        let headers = this._headers;
        return this._http.post('/api/childcards/addparent', body, { headers: headers })
            .map((resp: Response) => {
                return Observable.of(new ParentModel(resp.json()));
            })
            .catch((error: any) => { return Observable.throw(error); });
    }

    get currentUsersPositionName(): string {
        return this._authenticationService.position;
    }

    getChildrenCards(): Observable<ChildrenCardsModel> {
        let headers = this._headers;
        return this._http.get('/api/childcards/getchildrencards', { headers })
                         .map((resp: Response) => { return new ChildrenCardsModel(resp.json()); })
                         .catch((error: any) => { return Observable.throw(error); });
    }
    getChildrenCardsPaged(page: number, pageSize: number): void {
        let headers = this._headers;
        
        this._http.get("api/childcards/getchildrencardspaged?pageNumber=" + page + "&pageSize=" + pageSize, { headers })
            .map((resp: Response) => {
                let pagedResponse: ChildrenCardsPagedModel = new ChildrenCardsPagedModel();
                pagedResponse.pageCount = resp.json().paging.pageCount;
                pagedResponse.pageNumber = resp.json().paging.pageNumber;
                pagedResponse.pageSize = resp.json().paging.pageSize;
                pagedResponse.totalRecordCount = resp.json().paging.totalRecordCount;
                pagedResponse.childrenCards = new ChildrenCardsModel(resp.json().data);
                return pagedResponse;
            })
            .catch((error: any) => {
                return Observable.throw(error);
            })
            .subscribe(resp => {
                this._childrenCardsSubject.next(resp);
            });
    }
    get childrenCardsSubject() {
        return this._childrenCardsSubject;
    }

    /**
     * Method returns some patient data
     * @param {ViewPatientDataModel} viewPatientDataModel Contains data about patient to view
     * @return {Observable<ChildrenCardsModel>} Contains data about patients
    */
    viewPatientData(viewPatientDataModel: ViewPatientDataModel): Observable<ChildrenCardsModel> {
        let headers = this._headers;
        return this._http.get('/api/childcards/viewPatientData?firstName=' +
            viewPatientDataModel.firstName + "&&secondName=" +
            viewPatientDataModel.secondName + "&&lastName=" +
            viewPatientDataModel.lastName + "&&birthDate=" +
            viewPatientDataModel.birthDate.toISOString(), { headers })
            .map((resp: Response) => { return new ChildrenCardsModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    /**
     * Method saves psychiatrist's conclusion to child card
     * @param {string} childCardId Id of child card to save conclusion into
     * @param {string} conclusion Contains conclusion to save
     * @return {Observable<string>} Observable to saved conclusion by server
    */
    savePsychiatristsConclusion(childCardId : number, conclusion: string): Observable<string> {
        let headers: Headers = this._headers;
        return this._http.patch('/api/childcards/savePsychiatristsConclusion?childCardId=' +
            childCardId, '"'+conclusion+'"', { headers })
                         .map((resp: Response) => { return resp.text(); })
                         .catch((error: any) => { return Observable.throw(error); });
    }
}
