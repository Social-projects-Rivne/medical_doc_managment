import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import ChildrensCardService from '../services/children-card.service';

import ChildrenCardsModel from '../models/children-cards.model';

@Component({
    moduleId: module.id,
    selector: 'children-cards-list',
    templateUrl: 'children-cards-list.component.html',
    providers: [ChildrensCardService]
})
export default class ChildrenCardsListComponent{
    @Input() childrenCards: Observable<ChildrenCardsModel>; 
    private _childrensCardService: ChildrensCardService;

    constructor(childrensCardService: ChildrensCardService) {
        this.childrenCards = null;
        this._childrensCardService = childrensCardService;
    }
    
    getChildrenCardsFromServer(): void {
        this.childrenCards = this._childrensCardService.getChildrenCards();
    }

    updateUsersList(): void {
        this.childrenCards = this._childrensCardService.getChildrenCards();
    }
}