import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import ChildrensCardService from '../../../services/children-card.service';
import ChildrenCardsModel from '../../../models/children-cards.model';

@Component({
    moduleId: module.id,
    selector: 'children-cards-list',
    templateUrl: 'children-cards-list.component.html',
    providers: [ChildrensCardService, ChildrensCardService]
})
export default class ChildrenCardsListComponent implements OnInit {
    private _childrenCards: Observable<ChildrenCardsModel>; 
    private __childsCardService: ChildrensCardService;

    constructor(_childsCardService: ChildrensCardService, private _childrensCardService: ChildrensCardService) {
        this.__childsCardService = _childsCardService;
    }

    ngOnInit() {
        this.updateUsersList();
    }

    updateUsersList(): void {
        // this._childrenCards = this.__childsCardService.getChildrenCards();
        //this._childrensCardService.getChildrenCards().subscribe(childrenCards => this._childrenCards = childrenCards);
    }
}
