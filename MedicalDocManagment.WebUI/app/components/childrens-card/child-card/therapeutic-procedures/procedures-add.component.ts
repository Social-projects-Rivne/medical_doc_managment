import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';

import ChildCardModel from "../../../../models/child-card/child-card.model";
import ChildrenCardService from '../../../../services/children-card.service';
import SharedService from '../../../../services/shared.service';
import MainAppService from "../../../../services/main-app.service";
import ProcedureModel from "../../../../models/child-card/procedure.model";
import RehabilitationModel from "../../../../models/child-card/rehabilitation.model";

@Component({
    moduleId: module.id,
    selector: 'procedures-add',
    templateUrl: 'procedures-add.component.html',
    styleUrls: ['procedures-add.component.css'],
    providers: [
        SharedService,
        NotificationsService
    ]
})
export default class ProceduresAddComponent implements OnInit {
    procedures: ProcedureModel[];
    datePickerModel: IMyDateModel;
    myDatePickerOptions: IMyDpOptions;
    rehabilitation = new RehabilitationModel();
    private _childCard: ChildCardModel;
    private _childCardId: number;
    private _isSaving: boolean = false;
    private  maxCountProcedures: number = 2147483647;
    private _isMoreThanMaxProcedure: boolean = false;
    private _isErrorOcurred: boolean = false;
    private _errorMessage: string = "";

    constructor(private _childrenCardService: ChildrenCardService,
                private _mainAppService: MainAppService,
                private _sharedService: SharedService,
                private _notificationService: NotificationsService) {
        this._childCard = _mainAppService.currentCard;

    }

    ngOnInit() {
        this.updateProceduresList();
        this.myDatePickerOptions = this._sharedService.myDatePickerOptions;
    }

    updateProceduresList(): void {
        this._childrenCardService.getProcedures()
            .subscribe((data: ProcedureModel[]) => { console.log(data); this.procedures = data; });
    }

    resetFormData(form: NgForm) {
        form.reset();
    }

    updateDate() {
        let dateWithTimezoneOffset = this.datePickerModel.jsdate;
        let dateWithoutTimezoneOffset = new Date(dateWithTimezoneOffset.getTime() - (60000 * dateWithTimezoneOffset.getTimezoneOffset()));
        this.rehabilitation.beginDate = dateWithoutTimezoneOffset;
    }

    private getDateByMiliseconds(miliseconds: number) {
        return (miliseconds) ? new Date(miliseconds) : null;
    }

    isProceduresCountValid() {
        if (this.rehabilitation && this.rehabilitation.count) {
            if (this.rehabilitation.count > this.maxCountProcedures) {
                this._isMoreThanMaxProcedure = true;
            }
            else {
                this._isMoreThanMaxProcedure = false;
            }
        }
        else {
            this._isMoreThanMaxProcedure = false;
        }
    }

    getErrorMessage(error:any) {
        let errorArray = JSON.parse(error._body).modelState;
        for (let err in errorArray) {
            this._errorMessage += errorArray[err];
        }
    }

    submit(event: Event, form: NgForm) {
        event.preventDefault();
        this.updateDate();
        this._isSaving = true;
        this._isErrorOcurred = false;
        this._errorMessage = "";
        this._childrenCardService.addRehabilitationIntoChildCard(this._childCard.id,
            this.rehabilitation)
            .subscribe((response) => {
                this._isSaving = false;
                this.resetFormData(form);
                this._notificationService.success("Успіх", "Успішно додано призначення!");
                console.log(response);
            },
            (error: any) => {
                this._isSaving = false;
                this._isErrorOcurred = true;
                this.getErrorMessage(error);
                console.log(error);
                this._notificationService.error("Помилка", 'При збереженні призначення виникла \
                    помилка: \r\n' + <any>error);
            });
        
    }

}
