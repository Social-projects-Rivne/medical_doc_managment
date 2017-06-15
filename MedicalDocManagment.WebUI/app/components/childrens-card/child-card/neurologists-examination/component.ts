import { Component } from '@angular/core';

import NeurologistsExaminationModel from "../../../../models/child-card/neurologists-examination/examination.model";

import ChildrenCardService from '../../../../services/children-card.service';
import MainAppService from "../../../../services/main-app.service";

@Component({
    moduleId: module.id,
    selector: 'neurologists-examination',
    templateUrl: 'component.html'
})
export default class NeurologistsExaminationComponent {
    private _currentUserPositionName: string;

    constructor(childrenCardService: ChildrenCardService) {
        this._currentUserPositionName = childrenCardService.currentUsersPositionName;
    }
}