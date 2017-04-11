import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MainHttpFacade } from '../main-http.facade';

import ChildrenCardsModel from '../models/children-cards.model';

@Component({
    moduleId: module.id,
    selector: 'children-cards-list',
    templateUrl: 'children-cards-list.component.html',
    providers: [MainHttpFacade]
})
export default class ChildrenCardsListComponent implements OnInit {
    private _childrenCards: Observable<ChildrenCardsModel>; 
    private _mainHttpFacade: MainHttpFacade;

    constructor(mainHttpFacade: MainHttpFacade) {
        this._mainHttpFacade = mainHttpFacade;
    }

    ngOnInit() {
        this.updateUsersList();
    }

    updateUsersList(): void {
        this._childrenCards = this._mainHttpFacade.getChildrenCards();
    }
}

