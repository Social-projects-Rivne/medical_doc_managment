import { Component } from '@angular/core';

import ChildCardModel from "../../../../models/child-card/child-card.model";
import NeurologistsExaminationModel from "../../../../models/child-card/neurologists-examination/examination.model";

import ChildrenCardService from '../../../../services/children-card.service';
import MainAppService from "../../../../services/main-app.service";

@Component({
    moduleId: module.id,
    selector: 'neurologists-examination-view',
    templateUrl: 'view.component.html'
})
export default class NeurologistsExaminationViewComponent {
    private _childCard: ChildCardModel;
    private _childrenCardService: ChildrenCardService;
    private _isErrorOnLoading: boolean;
    private _isLoading: boolean;
    private _lastLoadingErrorMessage: string;
    private _neurologistsExamination: NeurologistsExaminationModel;

    constructor(childrenCardService: ChildrenCardService, mainAppService: MainAppService) {
        this._childrenCardService = childrenCardService;
        this._childCard = mainAppService.currentCard;
        this._isErrorOnLoading = false;
        this._isLoading = true;
        this._lastLoadingErrorMessage = '';
        this._neurologistsExamination = new NeurologistsExaminationModel();

        this._loadExaminationFromServer();
    }

    private _loadExaminationFromServer(): void {
        this._isLoading = true;
        this._isErrorOnLoading = false;
        this._lastLoadingErrorMessage = '';

        this._childrenCardService.getNeurologistsExamination(this._childCard.id)
            .subscribe((examination: NeurologistsExaminationModel) => {
                this._neurologistsExamination = examination;
                this._isLoading = false;
            },
            (error: any) => {
                this._isLoading = false;
                this._isErrorOnLoading = true;
                this._lastLoadingErrorMessage = 'При отриманні результатів огляду \
                    виникла помилка: \r\n' + <any>error;
            });
    }
}