import { Component } from '@angular/core';

import ChildCardModel from "../../../../models/child-card/child-card.model";
import PediatriciansExaminationModel from "../../../../models/child-card/pediatricians-examination/pediatricians-examination.model";
import { ChildBirthEnum } from '../../../../models/child-card/pediatricians-examination/child-birth.enum';

import ChildrenCardService from '../../../../services/children-card.service';
import MainAppService from "../../../../services/main-app.service";

@Component({
    moduleId: module.id,
    selector: 'pediatricians-examination',
    templateUrl: 'component.html'
})
export default class PediatriciansExaminationComponent {
    private _currentUserPositionName: string;

    constructor(childrenCardService: ChildrenCardService) {
        this._currentUserPositionName = childrenCardService.currentUsersPositionName;
    }
}