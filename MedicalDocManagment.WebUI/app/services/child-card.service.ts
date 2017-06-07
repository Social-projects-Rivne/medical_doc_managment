import { Inject, Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthenticationService } from "./authentication.service";

import ChildCardModel from "../models/child-card/child-card.model";
import NeurologistsExaminationModel from "../models/child-card/neurologists-examination/examination.model";
import PediatriciansExaminationModel from "../models/child-card/pediatricians-examination/pediatricians-examination.model";
import SpeechTherapistsExaminationModel from "../models/child-card/speech-therapists-examination/examination.model";

@Injectable()
export default class ChildCardService {
    readonly currentChildCardObservable: Observable<ChildCardModel>;

    private readonly _apiUrl: string;
    private _authenticationService: AuthenticationService;
    private _currentChildCard: ChildCardModel;
    private _headers: Headers;
    private _http: Http;

    constructor(http: Http, @Inject(AuthenticationService)
    authenticationService: AuthenticationService, route: ActivatedRoute) {
        this._apiUrl = '/api/childcard/';
        this._authenticationService = authenticationService;
        this._currentChildCard = null;

        this.currentChildCardObservable = Observable.create(
            (observer: Observer<ChildCardModel>) => {
                let subscription = route.params.subscribe(params => {
                    let childCardId = params['id'];
                    if (childCardId) {
                        if (!this._currentChildCard || (this._currentChildCard
                            && this._currentChildCard.id != childCardId)) {
                            this.getChildCard(childCardId)
                                .subscribe((childCard: ChildCardModel) => {
                                    this._currentChildCard = childCard;
                                    observer.next(childCard);
                                },
                                (error: any) => {
                                    observer.error(error);
                                });
                        }
                    }

                    return () => { subscription.unsubscribe(); }
                })
            })

        this._headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        this._headers.append('Authorization', 'Bearer ' + this._authenticationService.token);
        this._http = http;
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

    getChildCard(childCardId: number): Observable<ChildCardModel> {
        let headers: Headers = this._headers;
        return this._http.get(this._apiUrl + 'getChildCard?childCardId=' + childCardId,
            { headers })
            .map((resp: Response) => {
                return new ChildCardModel(resp.json());
            })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getNeurologistsExamination(childCardId: number): Observable<NeurologistsExaminationModel> {
        let headers: Headers = this._headers;
        return this._http.get(this._apiUrl + 'getNeurologistsExamination?childCardId=' + childCardId,
            { headers })
            .map((resp: Response) => {
                return new NeurologistsExaminationModel(resp.json());
            })
            .catch((error: any) => { return Observable.throw(error); });
    }

    /**
     * Method get's pediatrician's examination for child card
     * @param {string} childCardId Id of child card to get examination for
     * @return {Observable<PediatriciansExaminationModel>} Observable to examination
     */
    getPediatriciansExamination(childCardId: number): Observable<PediatriciansExaminationModel> {
        let headers: Headers = this._headers;
        return this._http.get(this._apiUrl + 'getPediatriciansExamination?childCardId=' + childCardId,
            { headers })
            .map((resp: Response) => {
                return new PediatriciansExaminationModel(resp.json());
            })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getSpeechTherapistsExamination(childCardId: number): Observable<SpeechTherapistsExaminationModel> {
        let headers: Headers = this._headers;
        return this._http.get(this._apiUrl + 'getSpeechTherapistsExamination?childCardId=' + childCardId,
            { headers })
            .map((resp: Response) => {
                return new SpeechTherapistsExaminationModel(resp.json());
            })
            .catch((error: any) => { return Observable.throw(error); });
    }

    saveNeurologistsExamination(childCardId: number,
        neurologistsExamination: NeurologistsExaminationModel):
        Observable<NeurologistsExaminationModel> {
        let headers: Headers = this._headers;
        let body: string = JSON.stringify(neurologistsExamination);
        return this._http.put(this._apiUrl + 'saveNeurologistsExamination?childCardId=' + childCardId,
            body, { headers })
            .map((resp: Response) => {
                return new NeurologistsExaminationModel(resp.json());
            })
            .catch((error: any) => { return Observable.throw(error); });
    }

    /**
     * Method saves pediatrician's examination to child card
     * @param {string} childCardId Id of child card to save examination into
     * @param {PediatriciansExaminationModel} pediatriciansExamination Contains examination to save
     * @return {Observable<PediatriciansExaminationModel>} Observable to saved examination by server
     */
    savePediatriciansExamination(childCardId: number,
        pediatriciansExamination: PediatriciansExaminationModel):
        Observable<PediatriciansExaminationModel> {
        let headers: Headers = this._headers;
        let body: string = JSON.stringify(pediatriciansExamination);
        return this._http.put(this._apiUrl + 'savePediatriciansExamination?childCardId=' + childCardId,
            body, { headers })
            .map((resp: Response) => {
                return new PediatriciansExaminationModel(resp.json());
            })
            .catch((error: any) => { return Observable.throw(error); });
    }

    saveSpeechTherapistsExamination(childCardId: number, examination: SpeechTherapistsExaminationModel):
        Observable<SpeechTherapistsExaminationModel> {
        let headers: Headers = this._headers;
        let body: string = JSON.stringify(examination);
        return this._http.put(this._apiUrl + 'saveSpeechTherapistsExamination?childCardId=' + childCardId,
            body, { headers })
            .map((resp: Response) => {
                return new SpeechTherapistsExaminationModel(resp.json());
            })
            .catch((error: any) => { return Observable.throw(error); });
    }

    /**
     * Method saves psychiatrist's conclusion to child card
     * @param {string} childCardId Id of child card to save conclusion into
     * @param {string} conclusion Contains conclusion to save
     * @return {Observable<string>} Observable to saved conclusion by server
    */
    savePsychiatristsConclusion(childCardId: number, conclusion: string): Observable<string> {
        let headers: Headers = this._headers;
        return this._http.patch(this._apiUrl + 'savePsychiatristsConclusion?childCardId=' +
            childCardId, '"' + conclusion + '"', { headers })
            .map((resp: Response) => { return JSON.parse(resp.text()); })
            .catch((error: any) => { return Observable.throw(error); });
    }
}