import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


import ChildCardModel from "../../../../models/child-card/child-card.model";
import SpeechTherapistsExaminationModel from "../../../../models/child-card/speech-therapists-examination/examination.model";

import ChildCardService from '../../../../services/child-card.service';
import ChildrenCardService from '../../../../services/children-card.service';

@Component({
    moduleId: module.id,
    providers: [ChildCardService, ChildrenCardService ],
    selector: 'speech-therapists-examination-view',
    styleUrls: ['view.component.css'],
    templateUrl: 'view.component.html'
})
export default class SpeechTherapistsExaminationViewComponent implements OnDestroy  {
    private _childCard: ChildCardModel;
    private _childCardSubscription: Subscription;
    private _childCardService: ChildCardService;
    private _childrenCardService: ChildrenCardService;
    private _isErrorOnLoading: boolean;
    private _isLoading: boolean;
    private _lastLoadingErrorMessage: string;
    private _examination: SpeechTherapistsExaminationModel;

    constructor(childCardService: ChildCardService, childrenCardService: ChildrenCardService) {
        this._childCard = null;
        this._childCardService = childCardService;
        this._childrenCardService = childrenCardService;
        this._childCardSubscription = this._childrenCardService.currentChildCardObservable
            .subscribe((childCard: ChildCardModel) => {
                this._childCard = childCard;
                this._loadExaminationFromServer();
            });;
        this._isErrorOnLoading = false;
        this._isLoading = true;
        this._lastLoadingErrorMessage = '';
        this._examination = new SpeechTherapistsExaminationModel();
    }

    private _loadExaminationFromServer(): void {
        this._isLoading = true;
        this._isErrorOnLoading = false;
        this._lastLoadingErrorMessage = '';

        this._childCardService.getSpeechTherapistsExamination(this._childCard.id)
            .subscribe((examination: SpeechTherapistsExaminationModel) => {
                this._examination = examination;
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