import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import MkhsService from "../../../services/mkhs.service";

import DiagnosisModel from "../../../models/diagnosis.model";

@Component({
    moduleId: module.id,
    selector: 'diagnosis-text',
    templateUrl: 'text.component.html',
    providers: [MkhsService]
})
export default class DiagnosisSelectModalComponent{
    private _diagnosis: DiagnosisModel;
    private _isLoading: boolean;
    private _mkhsService: MkhsService;

    constructor(mkhsService: MkhsService) {
        this._diagnosis = new DiagnosisModel();
        this._isLoading = false;
        this._mkhsService = mkhsService;
    }

    @Input()
    set diagnosisId(value: string) {
        if (this._diagnosis.id != value) {
            this._diagnosis.id = value;

            if (value) {
                this._isLoading = true;
                this._mkhsService.getDiagnosis(value)
                    .subscribe(
                    (diagnosis: DiagnosisModel) => {
                        this._diagnosis = diagnosis;
                        this._isLoading = false;
                    });
            }
        }
    }
}
