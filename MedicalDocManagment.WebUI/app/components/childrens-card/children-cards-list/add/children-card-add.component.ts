import { Component, Input, OnInit } from '@angular/core';

import ChildrensCardService from '../../../../services/children-card.service';
import MkhsService from "../../../../services/mkhs.service";
// import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';

import ChildCardModel from '../../../../models/child-card.model';
import DiagnosisModel from "../../../../models/diagnosis.model";
import DiagnosesModel from "../../../../models/diagnoses.model";
import ClassModel from "../../../../models/class.model";
import ClassesModel from "../../../../models/classes.model";
import BlockModel from '../../../../models/block.model';
import BlocksModel from '../../../../models/blocks.model';
import NosologyModel from "../../../../models/nosology.model";
import NosologiesModel from "../../../../models/nosologies.model";

@Component({
    moduleId: module.id,
    selector: 'children-card-add',
    templateUrl: 'children-card-add.component.html',
    providers: [ChildrensCardService, MkhsService]
})
export default class ChildrenCardAddComponent {
    childrensCard = new ChildCardModel();
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

    submit() {
        this._childrensCardService.addChildrenCard(this.childrensCard)
                                  .subscribe(
                                      (data) => {
                                          console.log(data);
                                      },
                                      (error) => {
                                          console.log(error);
                                      }
                                  );
        // this._notificationService.success("Успіх", "Дитячу картку успішно додано");
    }

    onDateChange(target: HTMLInputElement) {
        let miliseconds: number = target.valueAsNumber;

        this.childrensCard.date = this.getDateByMiliseconds(miliseconds);
    }

    onCheckInChange(target: HTMLInputElement) {
        let miliseconds: number = target.valueAsNumber;

        this.childrensCard.checkIn = this.getDateByMiliseconds(miliseconds);
    }

    onCheckOutChange(target: HTMLInputElement) {
        let miliseconds: number = target.valueAsNumber;

        this.childrensCard.checkOut = this.getDateByMiliseconds(miliseconds);
    }

    private getDateByMiliseconds(miliseconds: number) {
        return (miliseconds) ? new Date(miliseconds) : null;
    }
}
