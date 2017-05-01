import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import ChildCardModel from "../../../models/child-card.model";
import ChildrenCardService from '../../../services/children-card.service';
import MainAppService from "../../../services/main-app.service";

@Component({
    moduleId: module.id,
    selector: 'main-page',
    templateUrl: 'main-page.component.html'
})
export default class MainPageComponent {
    private _childCard: ChildCardModel;
    private _childrenCardService: ChildrenCardService;
    private _currentUsersPositionName: string;
    private _router: Router;

    constructor(childrenCardService: ChildrenCardService, mainAppService: MainAppService
        , router: Router) {
        this._childrenCardService = childrenCardService;
        this._childCard = mainAppService.currentCard;
        this._currentUsersPositionName = this._childrenCardService.currentUsersPositionName;
        this._router = router;
    }
}