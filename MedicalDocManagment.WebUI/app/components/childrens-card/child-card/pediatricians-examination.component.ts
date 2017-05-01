import { Component } from '@angular/core';

import ChildCardModel from "../../../models/child-card.model";
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

    constructor(childrenCardService: ChildrenCardService, mainAppService: MainAppService) {
        this._childrenCardService = childrenCardService;
        this._childCard = mainAppService.currentCard;
    }
}