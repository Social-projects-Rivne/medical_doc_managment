import { Component, Input, OnInit } from '@angular/core';

// import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import ChildCardModel from '../../models/child-card.model';
import DiagnosisModel from "../../models/diagnosis.model";
import DiagnosesModel from "../../models/diagnoses.model";
import ClassModel from "../../models/class.model";
import ClassesModel from "../../models/classes.model";
import BlockModel from '../../models/block.model';
import BlocksModel from '../../models/blocks.model';
import NosologyModel from "../../models/nosology.model";
import NosologiesModel from "../../models/nosologies.model";
import ChildrensCardService from '../../services/children-card.service';
import MkhsService from "../../services/mkhs.service";

@Component({
    moduleId: module.id,
    selector: 'children-card-add',
    templateUrl: 'children-card-add.component.html',
    providers: [ChildrensCardService, MkhsService]
})
export default class ChildrenCardAddComponent {
    childrensCard = new ChildCardModel();
    limitDate = new Date();
    isDatesErrorsVisible = false;
    isCheckInErrorsVisible = false;
    isCheckOutErrorsVisible = false;
    selectedClass = new ClassModel();
    classes: ClassesModel;
    selectedBlock = new BlockModel();
    blocks: BlocksModel;
    selectedNosology= new NosologyModel();
    nosologies: NosologiesModel;
    diagnoses: DiagnosesModel;
    // notificationOptions = { timeOut: 5000, lastOnBottom: true, clickToClose: true, maxLength: 0, maxStack: 7, showProgressBar: true, pauseOnHover: false, preventDuplicates: false, preventLastDuplicates: 'visible', animate: 'scale', position: ['right', 'bottom'] };

    constructor(private _childrensCardService: ChildrensCardService
        // , private _notificationService: NotificationsService
        , private _mkhsService: MkhsService) {
        this.limitDate.setDate(this.limitDate.getDate() + 1);
    }

    ngOnInit() {
        this._mkhsService.getClasses()
            .subscribe(classes => this.classes = classes);
    }

    selectedNosologyChanged() {
        this._mkhsService.getDiagnosesByNosologyId(this.selectedNosology.id)
            .subscribe(diagnoses => this.diagnoses = diagnoses);
    }

    selectedBlockChanged() {
        this._mkhsService.getNosologiesByBlockId(this.selectedBlock.id)
            .subscribe(nosologies => this.nosologies = nosologies);
    }

    selectedClassChanged() {
        this._mkhsService.getBlocksByClassId(this.selectedClass.id)
            .subscribe(blocks => this.blocks = blocks);
    }

    onCreate() {
        this._childrensCardService.addChildrenCard(this.childrensCard);
        // this._notificationService.success("Успіх", "Дитячу картку успішно додано");
    }

    onDateChange(target: HTMLInputElement) {
        let miliseconds: number = target.valueAsNumber;

        this.childrensCard.date = this.getDateByMiliseconds(miliseconds);

        this.isDatesErrorsVisible = this.isValidDate(this.childrensCard.date)
            ? false
            : true;
    }

    onCheckInChange(target: HTMLInputElement) {
        let miliseconds: number = target.valueAsNumber;

        this.childrensCard.checkIn = this.getDateByMiliseconds(miliseconds);

        this.isCheckInErrorsVisible = this.isValidDate(this.childrensCard.checkIn)
            ? false
            : true;
    }

    onCheckOutChange(target: HTMLInputElement) {
        let miliseconds: number = target.valueAsNumber;

        this.childrensCard.checkOut = this.getDateByMiliseconds(miliseconds);

        this.isCheckOutErrorsVisible = this.isValidDate(this.childrensCard.checkOut)
            ? false
            : true;
    }

    private getDateByMiliseconds(miliseconds: number) {
        return (miliseconds) ? new Date(miliseconds) : null;
    }

    private isValidDate(date: Date) {
        if (date != null && this.dateFirstMoreSecond(this.limitDate, date)) {

            return true
        }

        return false;
    }

    private dateFirstMoreSecond(firstDate: Date, secondDate: Date): boolean {
        if (firstDate.getFullYear() > secondDate.getFullYear()) {

            return true;
        }

        if (firstDate.getFullYear() == secondDate.getFullYear() &&
            firstDate.getMonth() > secondDate.getMonth()) {

            return true;
        }

        if (firstDate.getFullYear() == secondDate.getFullYear() &&
            firstDate.getMonth() == secondDate.getMonth() &&
            firstDate.getDay() > secondDate.getDay()) {

            return true;
        }

        return false;
    }

}
