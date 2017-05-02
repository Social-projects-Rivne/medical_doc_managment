import { Component } from '@angular/core';

import ChildCardModel from "../../../models/child-card.model";
import PediatriciansExaminationModel from "../../../models/pediatricians-examination/pediatricians-examination.model";
import ChildrenCardService from '../../../services/children-card.service';
import MainAppService from "../../../services/main-app.service";

@Component({
    moduleId: module.id,
    selector: 'pediatricians-examination',
    templateUrl: 'pediatricians-examination.component.html'
})
export default class PediatriciansExaminationComponent {
    private _childCard: ChildCardModel;
    private _childrenCardService: ChildrenCardService;
    // TODO don't forget to change type
    private _pediatriciansExamination: PediatriciansExaminationModel;

    constructor(childrenCardService: ChildrenCardService, mainAppService: MainAppService) {
        this._childrenCardService = childrenCardService;
        this._childCard = mainAppService.currentCard;
        //
        this._pediatriciansExamination = new PediatriciansExaminationModel();
    }
}