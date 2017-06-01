import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import ChildCardModel from "../../../../models/child-card/child-card.model";
import NeurologistsExaminationModel from "../../../../models/child-card/neurologists-examination/examination.model";

import ChildCardService from '../../../../services/child-card.service';

@Component({
    moduleId: module.id,
    providers: [ ChildCardService ],
    selector: 'neurologists-examination-view',
    templateUrl: 'view.component.html'
})
export default class NeurologistsExaminationViewComponent implements OnDestroy  {
    private _childCard: ChildCardModel;
    private _childCardSubscription: Subscription;
    private _childCardService: ChildCardService;
    private _isErrorOnLoading: boolean;
    private _isLoading: boolean;
    private _lastLoadingErrorMessage: string;
    private _neurologistsExamination: NeurologistsExaminationModel;

    constructor(childCardService: ChildCardService) {
        this._childCard = null;
        this._childCardService = childCardService;
        this._childCardSubscription = this._childCardService.currentChildCardObservable
            .subscribe((childCard: ChildCardModel) => {
                this._childCard = childCard;
                this._loadExaminationFromServer();
            });;
        this._isErrorOnLoading = false;
        this._isLoading = true;
        this._lastLoadingErrorMessage = '';
        this._neurologistsExamination = new NeurologistsExaminationModel();
    }

    private _loadExaminationFromServer(): void {
        this._isLoading = true;
        this._isErrorOnLoading = false;
        this._lastLoadingErrorMessage = '';

        this._childCardService.getNeurologistsExamination(this._childCard.id)
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

    ngOnDestroy(): void {
        this._childCardSubscription.unsubscribe();
    }
}