import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import ClassModel from "../models/class.model";
import ClassesModel from "../models/classes.model";
import BlockModel from "../models/block.model";
import BlocksModel from "../models/blocks.model";
import NosologyModel from "../models/nosology.model";
import NosologiesModel from "../models/nosologies.model";
import DiagnosisModel from "../models/diagnosis.model";
import DiagnosesModel from "../models/diagnoses.model";

@Injectable()
export default class MkhsService {
    private _apiUrl: string = '/api/childcards';
    private _headers: Headers;

    constructor(private _http: Http) {
        this._headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    }

    getClasses(): Observable<ClassesModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl+'/getclassesmkh', { headers })
            .map((resp: Response) => { return new ClassesModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getNosologiesByBlockId(blockId: string): Observable<NosologiesModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl +'/getnosologiesmkh?blockMkhId=' + blockId, { headers })
            .map((resp: Response) => { return new NosologiesModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getBlocksByClassId(classId: string): Observable<BlocksModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl +'/getblocksmkh?classMkhId=' + classId, { headers })
            .map((resp: Response) => { return new ClassesModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getDiagnosesByNosologyId(nosologyId: string): Observable<DiagnosesModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl +'/getdiagnosesmkh?nosologyMkhId=' + nosologyId, { headers })
            .map((resp: Response) => { return new ClassesModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    private _handleError(error: any) {
        console.error('Caught error', error);
        return Observable.throw(error.message || error);
    }
}
