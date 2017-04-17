import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { MainHttpFacade } from '../main-http.facade';
import ChildrensCardService from '../services/children-card.service';

import ChildrenCardsModel from '../models/children-cards.model';

@Component({
    moduleId: module.id,
    selector: 'children-cards-list',
    templateUrl: 'children-cards-list.component.html',
    providers: [MainHttpFacade, ChildrensCardService]
})
export default class ChildrenCardsListComponent implements OnInit {
    private _childrenCards: Observable<ChildrenCardsModel>; 
    private _mainHttpFacade: MainHttpFacade;

    constructor(mainHttpFacade: MainHttpFacade, private _childrensCardService: ChildrensCardService) {
        this._mainHttpFacade = mainHttpFacade;
    }

    ngOnInit() {
        this.updateUsersList();
    }

    updateUsersList(): void {
        this._childrenCards = this._mainHttpFacade.getChildrenCards();
        //this._childrensCardService.getChildrenCards().subscribe(childrenCards => this._childrenCards = childrenCards);
    }
}

