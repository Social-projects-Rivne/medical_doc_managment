﻿import { Inject, Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthenticationService } from "./authentication.service";

import ChildCardModel from "../models/child-card/child-card.model";
import PediatriciansExaminationModel from "../models/child-card/pediatricians-examination/pediatricians-examination.model";

@Injectable()
export default class ChildCardService {
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

        this._headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        this._headers.append('Authorization', 'Bearer ' + this._authenticationService.token);
        this._http = http;
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