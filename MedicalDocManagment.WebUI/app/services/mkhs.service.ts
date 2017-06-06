import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
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

import { AuthenticationService } from './authentication.service';

@Injectable()
export default class MkhsService {
    private _apiUrl: string = '/api/mkh';
    private _headers: Headers;

    constructor(private _http: Http, @Inject(AuthenticationService) private _authenticationService: AuthenticationService) {
        this._headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        this._headers.append('Authorization', 'Bearer ' + this._authenticationService.token);
    }

    getClassByBlockId(blockId: string): Observable<ClassModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl + '/getClassMkhByBlock?blockId=' + blockId,
            { headers })
            .map((resp: Response) => { return new ClassModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getClassByDiagnosisId(diagnosisId: string): Observable<ClassModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl + '/getClassMkhByDiagnosis?diagnosisId=' + diagnosisId,
            { headers })
            .map((resp: Response) => { return new ClassModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getClasses(): Observable<ClassesModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl + '/getclassesmkh', { headers })
            .map((resp: Response) => { return new ClassesModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getNosologiesByBlockId(blockId: string): Observable<NosologiesModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl + '/getnosologiesmkh?blockMkhId=' + blockId, { headers })
            .map((resp: Response) => { return new NosologiesModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getNosologiesByDiagnosisId(diagnosisId: string): Observable<NosologiesModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl + '/getNosologiesMkhByDiagnosis?diagnosisId=' + diagnosisId,
            { headers })
            .map((resp: Response) => { return new NosologiesModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getNosologyByDiagnosisId(diagnosisId: string): Observable<NosologyModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl + '/getNosologyMkhByDiagnosis?diagnosisId=' + diagnosisId,
            { headers })
            .map((resp: Response) => { return new NosologyModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getBlockByNosologyId(nosologyId: string): Observable<BlockModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl + '/getBlockMkhByNosology?nosologyId=' + nosologyId,
            { headers })
            .map((resp: Response) => { return new BlockModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getBlockByDiagnosisId(diagnosisId: string): Observable<BlockModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl + '/getBlockMkhByDiagnosis?diagnosisId=' + diagnosisId,
            { headers })
            .map((resp: Response) => { return new BlockModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getBlocksByClassId(classId: string): Observable<BlocksModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl + '/getblocksmkh?classMkhId=' + classId, { headers })
            .map((resp: Response) => { return new ClassesModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getBlocksByDiagnosisId(diagnosisId: string): Observable<BlocksModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl + '/getBlocksMkhByDiagnosis?diagnosisId=' + diagnosisId,
            { headers })
            .map((resp: Response) => { return new BlocksModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getBlocksByNosologyId(nosologyId: string): Observable<BlocksModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl + '/getBlocksMkhByNosology?nosologyId=' + nosologyId,
            { headers })
            .map((resp: Response) => { return new BlocksModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getDiagnosesByNosologyId(nosologyId: string): Observable<DiagnosesModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl + '/getdiagnosesmkh?nosologyMkhId=' + nosologyId, { headers })
            .map((resp: Response) => { return new ClassesModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    getDiagnosis(diagnosisId: string): Observable<DiagnosisModel> {
        let headers = this._headers;
        return this._http.get(this._apiUrl + '/getdiagnosismkh?diagnosisMkhId=' + diagnosisId, { headers })
            .map((resp: Response) => { return new DiagnosisModel(resp.json()); })
            .catch((error: any) => { return Observable.throw(error); });
    }

    private _handleError(error: any) {
        console.error('Caught error', error);
        return Observable.throw(error.message || error);
    }
}
