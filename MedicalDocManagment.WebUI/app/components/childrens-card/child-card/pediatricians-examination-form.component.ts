import { Component } from '@angular/core';

import ChildCardModel from "../../../models/child-card.model";
import PediatriciansExaminationModel from "../../../models/pediatricians-examination/pediatricians-examination.model";
import { ChildBirthEnum } from '../../../models/pediatricians-examination/child-birth.enum';
import Trilean from '../../../models/pediatricians-examination/trilean';

import ChildrenCardService from '../../../services/children-card.service';
import MainAppService from "../../../services/main-app.service";

@Component({
    moduleId: module.id,
    selector: 'pediatricians-examination-form',
    templateUrl: 'pediatricians-examination-form.component.html'
})
export default class PediatriciansExaminationFormComponent {
    // next is declared in such way so that enum can be used in template
    ChildBirthEnum = ChildBirthEnum;

    private _childCard: ChildCardModel;
    private _childrenCardService: ChildrenCardService;
    private _isErrorOnSaving: boolean;
    private _isSaving: boolean;
    private _lastErrorMessage: string;
    private _pediatriciansExamination: PediatriciansExaminationModel;

    constructor(childrenCardService: ChildrenCardService, mainAppService: MainAppService) {
        this._childrenCardService = childrenCardService;
        this._childCard = mainAppService.currentCard;
        this._isErrorOnSaving = false;
        this._isSaving = false;
        this._lastErrorMessage = null;
        this._pediatriciansExamination = new PediatriciansExaminationModel();
    }

    private _textDecoration(textState: Trilean): string {
        let result = '';
        if (textState.value == true) {
            result += 'underline'
        } else {
            if (textState.value == false) {
                result += 'line-through'
            }
        }
        return result;
    }

    private _Save():void {
        this._lastErrorMessage = '';
        this._isErrorOnSaving = false;
        this._isSaving = true;
        this._childrenCardService.savePediatriciansExamination(this._childCard.id,
            this._pediatriciansExamination)
            .subscribe((savedExamination: PediatriciansExaminationModel) => {
                this._pediatriciansExamination = savedExamination;
                this._isSaving = false;
            },
            (error: any) => {
                this._isSaving = false;
                this._isErrorOnSaving = true;
                this._lastErrorMessage = 'При збереженні результатів огляду \
                                        виникла помилка: \r\n' + <any>error;
            });
    }
}