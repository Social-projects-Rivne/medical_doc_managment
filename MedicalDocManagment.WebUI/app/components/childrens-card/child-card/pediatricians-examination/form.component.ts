import { Component } from '@angular/core';

import ChildCardModel from "../../../../models/child-card/child-card.model";
import PediatriciansExaminationModel from "../../../../models/child-card/pediatricians-examination/pediatricians-examination.model";
import { ChildBirthEnum } from '../../../../models/child-card/pediatricians-examination/child-birth.enum';

import ChildrenCardService from '../../../../services/children-card.service';
import MainAppService from "../../../../services/main-app.service";

@Component({
    moduleId: module.id,
    selector: 'pediatricians-examination-form',
    templateUrl: 'form.component.html'
})
export default class PediatriciansExaminationFormComponent {
    // next is declared in such way so that enum can be used in template
    ChildBirthEnum = ChildBirthEnum;

    private _childCard: ChildCardModel;
    private _childrenCardService: ChildrenCardService;
    private _isErrorOnLoading: boolean;
    private _isErrorOnSaving: boolean;
    private _isLoading: boolean;
    private _isSaving: boolean;
    private _lastLoadingErrorMessage: string;
    private _lastSavingErrorMessage: string;
    private _pediatriciansExamination: PediatriciansExaminationModel;

    constructor(childrenCardService: ChildrenCardService, mainAppService: MainAppService) {
        this._childrenCardService = childrenCardService;
        this._childCard = mainAppService.currentCard;
        this._isErrorOnLoading = false;
        this._isErrorOnSaving = false;
        this._isLoading = true;
        this._isSaving = false;
        this._lastLoadingErrorMessage = '';
        this._lastSavingErrorMessage = '';
        this._pediatriciansExamination = new PediatriciansExaminationModel();

        this._loadExaminationFromServer();
    }

    private _loadExaminationFromServer(): void {
        this._isLoading = true;
        this._isErrorOnLoading = false;
        this._lastLoadingErrorMessage = '';

        this._childrenCardService.getPediatriciansExamination(this._childCard.id)
            .subscribe((examination: PediatriciansExaminationModel) => {
                this._pediatriciansExamination = examination;
                this._isLoading = false;
            },
            (error: any) => {
                this._isLoading = false;
                this._isErrorOnLoading = true;
                this._lastLoadingErrorMessage = 'При отриманні результатів огляду \
                    виникла помилка: \r\n' + <any>error;
            });
    }

    private _textDecoration(textState: boolean): string {
        let result = '';
        if (textState == true) {
            result += 'underline'
        } else {
            if (textState == false) {
                result += 'line-through'
            }
        }
        return result;
    }

    private _save():void {
        this._lastSavingErrorMessage = '';
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
                this._lastSavingErrorMessage = 'При збереженні результатів огляду \
                    виникла помилка: \r\n' + <any>error;
            });
    }
}