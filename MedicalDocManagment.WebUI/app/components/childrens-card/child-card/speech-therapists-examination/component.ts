import { Component } from '@angular/core';

import SpeechTherapistsExaminationModel from "../../../../models/child-card/speech-therapists-examination/examination.model";

import ChildrenCardService from '../../../../services/children-card.service';
import MainAppService from "../../../../services/main-app.service";

@Component({
    moduleId: module.id,
    selector: 'speech-therapists-examination',
    templateUrl: 'component.html'
})
export default class SpeechTherapistsExaminationComponent {
    private _currentUserPositionName: string;

    constructor(childrenCardService: ChildrenCardService) {
        this._currentUserPositionName = childrenCardService.currentUsersPositionName;
    }
}