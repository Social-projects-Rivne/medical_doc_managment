import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import SharedService from '../../../../services/shared.service';
import VisitService from '../../../../services/visit.service';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';

import VisitModel from '../../../../models/visit.model';
import ChildCardModel from '../../../../models/child-card.model';
import UserModel from '../../../../models/usermodel';

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
    visit: VisitModel
    @Input() patient: ChildCardModel;

    constructor(private _visitService: VisitService,
        private _sharedService: SharedService,
        private _notificationService: NotificationsService) {
        this.visit = new VisitModel();
    }

    ngOnInit() {
        let currentDoctor = this._sharedService.getCurrentUser();
        this.visit.doctorId = currentDoctor.id;
        this.visit.patientId = this.patient.id;
    }

    submitVisit(form: NgForm) {
        this._visitService.createVisit(this.visit)
            .subscribe(
            (data: VisitModel) => {
                this._notificationService.success("Успіх", "Заключення додано успішно!");
                this.visit.date = null;
                form.reset();
                console.log(data);
            },
            (error) => {
                this._notificationService.error("Помилка", "Заключення не було додано успішно.");
                console.log('Error: ' + error);
            }
            );
    }

    onDateChange(target: HTMLInputElement) {
        let miliseconds: number = target.valueAsNumber;

        this.visit.date = this.getDateByMiliseconds(miliseconds);
    }

    private getDateByMiliseconds(miliseconds: number) {
        return (miliseconds) ? new Date(miliseconds) : null;
    }

}
