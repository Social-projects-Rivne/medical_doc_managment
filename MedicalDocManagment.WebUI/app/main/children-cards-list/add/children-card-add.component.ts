import { Component, OnInit } from '@angular/core';

import ChildCardModel from '../../models/child-card.model';

import ChildrensCardService from '../../services/children-card.service';
// import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import DiagnosisModel from "../../models/diagnosis.model";
import DiagnosisService from "../../services/diagnosis.service";

@Component({
    moduleId: module.id,
    selector: 'children-card-add',
    templateUrl: 'children-card-add.component.html',
    providers: [ChildrensCardService, DiagnosisService]

})
export default class ChildrenCardAddComponent {
    childrensCard: ChildCardModel = new ChildCardModel();
    // notificationOptions = { timeOut: 5000, lastOnBottom: true, clickToClose: true, maxLength: 0, maxStack: 7, showProgressBar: true, pauseOnHover: false, preventDuplicates: false, preventLastDuplicates: 'visible', animate: 'scale', position: ['right', 'bottom'] };
    isDatesErrorsVisible: boolean = false;
    isCheckInErrorsVisible: boolean = false;
    isCheckOutErrorsVisible: boolean = false;
    limitDate = new Date();

    diagnosisList: DiagnosisModel[];

    constructor(private _childrensCardService: ChildrensCardService
        // , private _notificationService: NotificationsService
        , private _diagnosisService: DiagnosisService) {
        this.limitDate.setDate(this.limitDate.getDate() + 1);
    }

    ngOnInit() {
        this.diagnosisList = this._diagnosisService.getDiagnoses();
    }

    onCreate() {
        this._childrensCardService.addChildrenCard(this.childrensCard);
        console.log(this.childrensCard);
        console.log(this._childrensCardService.getChildrensCards());
        // this._notificationService.success("Успіх", "Дитячу картку успішно додано");
    }

    onDateChange(target: HTMLInputElement) {
        let miliseconds: number = target.valueAsNumber;
        this.childrensCard.date = (miliseconds) ? new Date(miliseconds) : null;
        this.isDatesErrorsVisible = (this.childrensCard.date != null && this.dateFirstMoreSecond(this.limitDate, this.childrensCard.date))
            ? false
            : true;
    }

    onCheckInChange(target: HTMLInputElement) {
        let miliseconds: number = target.valueAsNumber;
        this.childrensCard.checkIn = (miliseconds) ? new Date(miliseconds) : null;
        this.isCheckInErrorsVisible = (this.childrensCard.checkIn != null && this.dateFirstMoreSecond(this.limitDate, this.childrensCard.checkIn))
            ? false
            : true;
    }

    onCheckOutChange(target: HTMLInputElement) {
        let miliseconds: number = target.valueAsNumber;
        this.childrensCard.checkOut = (miliseconds) ? new Date(miliseconds) : null;
        this.isCheckOutErrorsVisible = (this.childrensCard.checkOut != null && this.dateFirstMoreSecond(this.limitDate, this.childrensCard.checkOut))
            ? false
            : true;
    }

    private dateFirstMoreSecond(f: Date, s: Date): boolean {
        if (f.getFullYear() > s.getFullYear()) {
            return true;
        }
        if (f.getFullYear() == s.getFullYear() && f.getMonth() > s.getMonth()) {
            return true;
        }
        if (f.getFullYear() == s.getFullYear() && f.getMonth() == s.getMonth() && f.getDay() > s.getDay()) {
            return true;
        }
        return false;
    }
}