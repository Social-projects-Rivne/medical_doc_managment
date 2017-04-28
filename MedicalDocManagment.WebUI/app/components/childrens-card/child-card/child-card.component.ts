import { Component, Input } from '@angular/core';

import ChildCardModel from "../../../models/child-card.model";
import ChildrenCardService from '../../../services/children-card.service';
import MainAppService from "../../../services/main-app.service";

@Component({
    moduleId: module.id,
    selector: '[child-card]',
    templateUrl: 'child-card.component.html'
})
export default class ChildCardComponent {
    private _childCard: ChildCardModel;
    private _childrenCardService: ChildrenCardService;
    private _currentUsersPositionName: string;

    constructor(childrenCardService: ChildrenCardService, mainAppService: MainAppService) {
        this._childrenCardService = childrenCardService;
        this._childCard = mainAppService.currentUser;
        this._currentUsersPositionName = this._childrenCardService.currentUsersPositionName;
    }
}