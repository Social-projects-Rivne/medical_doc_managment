import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import ChildCardModel from "../../../../models/child-card/child-card.model";
import SpeechTherapistsExaminationModel from "../../../../models/child-card/speech-therapists-examination/examination.model";

import ChildCardService from '../../../../services/child-card.service';

@Component({
    moduleId: module.id,
    providers: [ ChildCardService ],
    selector: 'speech-therapists-examination-view',
    templateUrl: 'view.component.html'
})
export default class SpeechTherapistsExaminationViewComponent implements OnDestroy  {
    private _childCard: ChildCardModel;
    private _childCardSubscription: Subscription;
    private _childCardService: ChildCardService;
    private _isErrorOnLoading: boolean;
    private _isLoading: boolean;
    private _lastLoadingErrorMessage: string;
    private _speechTherapistsExamination: SpeechTherapistsExaminationModel;

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
        this._speechTherapistsExamination = new SpeechTherapistsExaminationModel();
    }

    private _loadExaminationFromServer(): void {
        this._isLoading = true;
        this._isErrorOnLoading = false;
        this._lastLoadingErrorMessage = '';

        this._childCardService.getSpeechTherapistsExamination(this._childCard.id)
            .subscribe((examination: SpeechTherapistsExaminationModel) => {
                this._speechTherapistsExamination = examination;
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