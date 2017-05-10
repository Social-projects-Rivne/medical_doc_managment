import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import ChildrensCardService from '../../../../services/children-card.service';
import MkhsService from "../../../../services/mkhs.service";
//import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';

import ParentChildCard from "../../../../models/parent-child-card.model";
import ParentModel from "../../../../models/parent.model";
import ChildCardModel from '../../../../models/child-card.model';
import DiagnosisModel from "../../../../models/diagnosis.model";
import DiagnosesModel from "../../../../models/diagnoses.model";
import ClassModel from "../../../../models/class.model";
import ClassesModel from "../../../../models/classes.model";
import BlockModel from '../../../../models/block.model';
import BlocksModel from '../../../../models/blocks.model';
import NosologyModel from "../../../../models/nosology.model";
import NosologiesModel from "../../../../models/nosologies.model";
declare var $;

@Component({
    moduleId: module.id,
    selector: 'children-card-add',
    templateUrl: 'children-card-add.component.html',
    providers: [
        ChildrensCardService,
        MkhsService/*,*/
        //NotificationsService
    ]
})
export default class ChildrenCardAddComponent {
    childrensCard = new ChildCardModel();
    selectedClass = new ClassModel();
    classes: ClassesModel;
    selectedBlock = new BlockModel();
    blocks: BlocksModel;
    selectedNosology = new NosologyModel();
    nosologies: NosologiesModel;
    diagnoses: DiagnosesModel;
    listParents = new Array<ParentModel>();
    notificationOptions = {
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

    constructor(private _childrensCardService: ChildrensCardService,
        //private _notificationService: NotificationsService,
        private _mkhsService: MkhsService) {
    }

    parentAddedEvent(parent: ParentModel) {
        this.listParents.push(parent);
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

    submit(form: NgForm ) {
        this._childrensCardService.addChildrenCard(this.childrensCard)
            .subscribe(
                (data) => {
                    //this._notificationService.success("Успіх", "Дитячу картку успішно додано");
                    let newChildCard = new ChildCardModel(data)
                    this._addParentsIntoChildCard(this.listParents, newChildCard);
                    this._formReset(form);
                },
                (error) => {
                    //this._notificationService.error("Помилка", "Дитячу картку не було додано");
                    console.log('Error: ' + error);
                }
            );
    }

    private _addParentsIntoChildCard(listParents: ParentModel[], childCard: ChildCardModel) {
        listParents.forEach((parent) => {
            this._childrensCardService
                .addParentIntoChildCard(parent, childCard)
                .subscribe(
                    (data) => {
                        //this._notificationService.info("Інформація про картку №" + data.childId,
                        //                                "До картки успішно додану інформацію про батька №" + data.parentId);
                    },
                    (error) => {
                        //this._notificationService.error("Помилка", "Сталася помилки при додаванні до картки інформації про батька");
                        console.log(error);
                    }
                );
        });
    }

    private _formReset(form: NgForm) {
        form.reset();
        this.listParents = new Array<ParentModel>();
        this._resetAnyDate();
    }

    private _resetAnyDate() {
        $('#date')[0].value = "";
        $('#checkin')[0].value = "";
        $('#checkout')[0].value = "";
        this.childrensCard.date = null;
        this.childrensCard.checkIn = null;
        this.childrensCard.checkOut = null;
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
