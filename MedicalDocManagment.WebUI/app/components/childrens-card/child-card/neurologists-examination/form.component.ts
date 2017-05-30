import { Component, ElementRef, ViewChild } from '@angular/core';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
declare var $;

import ChildCardModel from "../../../../models/child-card/child-card.model";
import NeurologistsExaminationModel from "../../../../models/child-card/neurologists-examination/examination.model";

import ChildrenCardService from '../../../../services/children-card.service';
import MainAppService from "../../../../services/main-app.service";

@Component({
    moduleId: module.id,
    providers: [
        ChildrenCardService,
        NotificationsService
    ],
    selector: 'neurologists-examination-form',
    styleUrls: ['form.component.css'],
    templateUrl: 'form.component.html'
})
export default class NeurologistsExaminationFormComponent {
    private _childCard: ChildCardModel;
    private _childrenCardService: ChildrenCardService;
    private _isErrorOnLoading: boolean;
    private _isErrorOnSaving: boolean;
    private _isLoading: boolean;
    private _isSaving: boolean;
    private _lastLoadingErrorMessage: string;
    private _lastSavingErrorMessage: string;
    private _neurologistsExamination: NeurologistsExaminationModel;
    private _notificationOptions: any;
    private _notificationService: NotificationsService;

    constructor(childrenCardService: ChildrenCardService, mainAppService: MainAppService,
        notificationService: NotificationsService, ){
        this._childrenCardService = childrenCardService;
        this._childCard = mainAppService.currentCard;
        this._isErrorOnLoading = false;
        this._isErrorOnSaving = false;
        this._isLoading = true;
        this._isSaving = false;
        this._lastLoadingErrorMessage = '';
        this._lastSavingErrorMessage = '';
        this._neurologistsExamination = new NeurologistsExaminationModel();
        this._notificationOptions = {
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true,
            maxLength: 0,
            maxStack: 7,
            showProgressBar: true,
            pauseOnHover: false,
            preventDuplicates: false,
            preventLastDuplicates: 'visible',
            animate: 'scale',
            position: ['right', 'bottom']
        };
        this._notificationService = notificationService;

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

    @ViewChild('neurologicalStateHeadCircumferenceInput')
    set _neurologicalStateHeadCircumferenceInput(elementRef: ElementRef) {
        if (elementRef) {
            $(elementRef.nativeElement).tooltip();
        }
    }

    set _neurologicalStateHeadCircumferenceValue(value: string) {
        this._neurologistsExamination.neurologicalState.headCircumference =
            parseFloat(value.replace(',', '.'));
    }

    get _neurologicalStateHeadCircumferenceValue(): string {
        let value = this._neurologistsExamination.neurologicalState.headCircumference;
        return value ? value.toString().replace('.', ',') : '';
    }

    private _save():void {
        this._lastSavingErrorMessage = '';
        this._isErrorOnSaving = false;
        this._isSaving = true;
        this._childrenCardService.saveNeurologistsExamination(this._childCard.id,
            this._neurologistsExamination)
            .subscribe((savedExamination: NeurologistsExaminationModel) => {
                this._notificationService.success("Успіх", "Огляд невролога успішно збережено");
                this._neurologistsExamination = savedExamination;
                this._isSaving = false;
            },
            (error: any) => {
                this._notificationService.error("Помилка",
                    "При збереженні огляду невролога виникла помилка");
                this._isSaving = false;
                this._isErrorOnSaving = true;
                this._lastSavingErrorMessage = 'При збереженні результатів огляду \
                    виникла помилка: \r\n' + <any>error;
            });
    }
}