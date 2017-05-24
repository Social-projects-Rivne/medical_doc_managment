import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
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
    providers: [
        VisitService,
        SharedService,
        NotificationsService
    ]
})
export default class VisitComponent implements OnInit {
    visit: VisitModel;
    @Input() patient: ChildCardModel;
    @Output() addVisit: EventEmitter<VisitModel>;

    private datePickerModel: IMyDateModel;
    private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
        dayLabels: { su: 'Нед', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Суб' },
        monthLabels: { 1: 'Січ', 2: 'Гру', 3: 'Бер', 4: 'Кві', 5: 'Тра', 6: 'Чер', 7: 'Лип', 8: 'Сер', 9: 'Вер', 10: 'Жов', 11: 'Лист', 12: 'Гру' },
        todayBtnTxt: 'Сьогодні'
    };

    constructor(private _visitService: VisitService,
                private _sharedService: SharedService,
                private _notificationService: NotificationsService) {
        this.visit = new VisitModel();
        this.addVisit = new EventEmitter<VisitModel>();
    }

    ngOnInit() {
        let currentDoctor = this._sharedService.getCurrentUser();
        this.visit.doctorId = currentDoctor.id;
        this.visit.patientId = this.patient.id;
    }

    submitVisit(form: NgForm) {
        this._updateDate();
        this._visitService.createVisit(this.visit)
            .subscribe(
            (result: VisitModel) => {
                $('#createVisitModal').modal('hide');
                this.visit.date = null;
                form.reset();
                console.log(result);
                this.addVisit.emit(result);
                this._notificationService.success("Успіх", "Заключення додано успішно!");
            },
            (error) => {
                this._notificationService.error("Помилка", "Заключення не було додано успішно.");
                console.log('Error: ' + error);
            }
            );
    }

    private _updateDate() {
        this.visit.date = this.datePickerModel.jsdate;
    }

}
