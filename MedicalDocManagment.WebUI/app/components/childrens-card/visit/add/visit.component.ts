﻿import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IMyDateModel, IMyDpOptions } from 'mydatepicker';

import SharedService from '../../../../services/shared.service';
import VisitService from '../../../../services/visit.service';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';

import VisitModel from '../../../../models/visit.model';
import ChildCardModel from '../../../../models/child-card/child-card.model';
import UserModel from '../../../../models/usermodel';

declare let $;

@Component({
    moduleId: module.id,
    selector: 'create-visit-form',
    templateUrl: 'visit.component.html',
    styleUrls: [
        'visit.component.css'
    ],
    providers: [
        VisitService,
        SharedService,
        NotificationsService
    ]
})
export default class VisitComponent implements OnInit {
    visit: VisitModel;
    patientId: number;
    responseErrors: string[];
    isValidResponse: boolean;
    datePickerModel: IMyDateModel;
    myDatePickerOptions: IMyDpOptions;
    editor: any;
    @Output() addVisit: EventEmitter<VisitModel>;

    constructor(private _visitService: VisitService,
                private _sharedService: SharedService,
                private _notificationService: NotificationsService) {
        this.visit = new VisitModel();
        this.addVisit = new EventEmitter<VisitModel>();
    }

    ngOnInit() {
        this.patientId = this._sharedService.getChildrenCardIdFromRoute();
        let currentDoctor = this._sharedService.getCurrentUser();
        this.visit.doctorId = currentDoctor.id;
        this.visit.patientId = this.patientId;
        this.isValidResponse = true;
        this.myDatePickerOptions = this._sharedService.myDatePickerOptions;
    }

    submitVisit(form: NgForm) {
        this.updateDate();
        this._visitService.createVisit(this.visit)
            .subscribe(
                (result: VisitModel) => {
                    $('#createVisitModal').modal('hide');
                    this.resetFormData(form);
                    console.log(result);
                    this.addVisit.emit(result);
                    this._notificationService.success("Успіх", "Заключення додано успішно!");
                },
                (error) => {
                    let errors = JSON.parse(error._body);
                    this.fillResponseErrors(errors);
                    console.log(errors);
                    this.isValidResponse = false;
                    this._notificationService.error("Помилка", "Заключення не було додано успішно.");
                }
            );
    }

    fillResponseErrors(errors) {
        this.responseErrors = [];
        for (let i = 0; i < errors.length; i++) {
            let errorMessage: string = errors[i].errorMessage;
            this.responseErrors.push(errorMessage)
        }
    }

    resetFormData(form: NgForm) {
        this.visit.date = null;
        this.responseErrors = [];
        this.editor.setContent('');
        form.reset();
    }

    updateDate() {
        let dateWithTimezoneOffset = this.datePickerModel.jsdate; 
        let dateWithoutTimezoneOffset = new Date(dateWithTimezoneOffset.getTime() - (60000 * dateWithTimezoneOffset.getTimezoneOffset())); 
        this.visit.date = dateWithoutTimezoneOffset;
    }

    keyupHandlerFunction(editor: any) {
        if (!this.editor) {
            this.editor = editor;
        }
        
        this.visit.summary = this.editor.getContent();
    }

}
