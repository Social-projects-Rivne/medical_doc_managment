import { Injectable} from '@angular/core';
import { Http} from '@angular/http';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'

import DiagnosisModel from '../models/diagnosis.model';

// import { AuthenticationService } from '../login/authentication.service';

@Injectable()
export default class DiagnoseService {
    private diagnosesList:DiagnosisModel[] = [
  new DiagnosisModel({ id: 'A00.1', name: 'LABEL1'}),
  new DiagnosisModel({ id: 'A00.2', name: 'LABEL2'}),
  new DiagnosisModel({ id: 'A00.3', name: 'LABEL3'}),
];
    private headers: Headers;

    constructor(private http: Http) {
    // constructor(private http: Http, private authenticationService: AuthenticationService) {
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        // this.headers.append('Authorization', 'Bearer ' + authenticationService.token);
    }

    getDiagnoses(): DiagnosisModel[]{
        return this.diagnosesList;
    }

    addChildrenCard(diagnose: DiagnosisModel): boolean {
        if(diagnose){
            this.diagnosesList.push(diagnose);
            return true;
        } else {
            return false;
        }
    }
}