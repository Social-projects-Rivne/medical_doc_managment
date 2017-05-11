import { Component } from '@angular/core';

import ChildCardModel from "../../../../models/child-card.model";
import PediatriciansExaminationModel from "../../../../models/pediatricians-examination/pediatricians-examination.model";
import { ChildBirthEnum } from '../../../../models/pediatricians-examination/child-birth.enum';

import ChildrenCardService from '../../../../services/children-card.service';
import MainAppService from "../../../../services/main-app.service";

@Component({
    moduleId: module.id,
    selector: 'pediatricians-examination-view',
    templateUrl: 'view.component.html'
})
export default class PediatriciansExaminationViewComponent {
    // next is declared in such way so that enum can be used in template
    ChildBirthEnum = ChildBirthEnum;

    private _childCard: ChildCardModel;
    private _childrenCardService: ChildrenCardService;
    private _isErrorOnLoading: boolean;
    private _isLoading: boolean;
    private _lastLoadingErrorMessage: string;
    private _pediatriciansExamination: PediatriciansExaminationModel;

    constructor(childrenCardService: ChildrenCardService, mainAppService: MainAppService) {
        this._childrenCardService = childrenCardService;
        this._childCard = mainAppService.currentCard;
        this._isErrorOnLoading = false;
        this._isLoading = true;
        this._lastLoadingErrorMessage = '';
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
}