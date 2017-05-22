import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import ChildCardModel from "../../../models/child-card/child-card.model";
import MainAppService from "../../../services/main-app.service";

@Component({
    moduleId: module.id,
    selector: '[children-cards-list-item]',
    templateUrl: 'children-cards-list-item.component.html',
    styleUrls: ['children-cards-list-item.component.css']
})
export default class ChildrenCardsListItemComponent {
    @Input() childCard: ChildCardModel;
    private _mainAppService: MainAppService;
    private _router: Router;

    constructor(mainAppService: MainAppService, router: Router) {
        this.childCard = new ChildCardModel();

        this._mainAppService = mainAppService;
        this._router = router;
    }

    openChildCard(): void {
        this._mainAppService.currentCard = this.childCard;
        this._router.navigateByUrl('/main/childCard/' + this.childCard.id);
    }
}