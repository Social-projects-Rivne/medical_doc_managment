import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { Subscription } from 'rxjs/Subscription';
declare var $;

import ChildCardModel from "../../../../models/child-card/child-card.model";
import SpeechTherapistsExaminationModel from "../../../../models/child-card/speech-therapists-examination/examination.model";

import ChildCardService from '../../../../services/child-card.service';

@Component({
    moduleId: module.id,
    providers: [
        ChildCardService,
        NotificationsService
    ],
    selector: 'speech-therapists-examination-form',
    styleUrls: ['form.component.css'],
    templateUrl: 'form.component.html'
})
export default class SpeechTherapistsExaminationFormComponent implements OnDestroy {
    private _childCard: ChildCardModel;
    private _childCardSubscription: Subscription;
    private _childCardService: ChildCardService;
    private _dateFormat: Object;
    private _examination: SpeechTherapistsExaminationModel;
    private _isErrorOnLoading: boolean;
    private _isErrorOnSaving: boolean;
    private _isLoading: boolean;
    private _isLoadingDiagnosis: boolean;
    private _isSaving: boolean;
    private _lastLoadingErrorMessage: string;
    private _lastSavingErrorMessage: string;
    private _notificationOptions: any;
    private _notificationService: NotificationsService;

    constructor(childCardService: ChildCardService,
        notificationService: NotificationsService) {
        this._childCard = null;
        this._childCardService = childCardService;
        this._childCardSubscription = this._childCardService.currentChildCardObservable
            .subscribe((childCard: ChildCardModel) => {
                this._childCard = childCard;
                this._loadExaminationFromServer();
            });
        this._dateFormat = {
            toDisplay: (date: Date, format, language) => {
                let str = date.format('"dd" MM yyyyр.');
                console.log('toDisplay: (date: Date, format, language)');
                console.log(date);
                console.log(str);
                return str;
            },
            toValue: (date, format, language) => {
                let obj = new Date(date);
                console.log('toValue: (date: string, format, language)');
                console.log(date);
                console.log(obj);
                return obj;
            },
        }
        this._examination = new SpeechTherapistsExaminationModel();
        this._isErrorOnLoading = this._isErrorOnSaving = false;
        this._isLoading = true;
        this._isSaving = false;
        this._isLoadingDiagnosis = false;
        this._lastLoadingErrorMessage = '';
        this._lastSavingErrorMessage = '';
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

    private _save():void {
        this._lastSavingErrorMessage = '';
        this._isErrorOnSaving = false;
        this._isSaving = true;

        this._childCardService.saveSpeechTherapistsExamination(this._childCard.id,
            this._examination)
            .subscribe((savedExamination: SpeechTherapistsExaminationModel) => {
                this._notificationService.success("Успіх", "Огляд невролога успішно збережено");
                this._examination = savedExamination;
                this._isSaving = false;
            },
            (error: any) => {
                this._notificationService.error("Помилка",
                    "При збереженні огляду логопеда виникла помилка");
                this._isSaving = false;
                this._isErrorOnSaving = true;
                this._lastSavingErrorMessage = 'При збереженні результатів огляду \
                    виникла помилка: \r\n' + <any>error;
            });
    }

    ngOnDestroy(): void {
        this._childCardSubscription.unsubscribe();
    }
}