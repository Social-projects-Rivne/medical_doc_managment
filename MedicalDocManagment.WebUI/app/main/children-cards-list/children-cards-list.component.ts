import { Component, Input } from '@angular/core';
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
export default class ChildrenCardsListComponent{
    @Input() childrenCards: Observable<ChildrenCardsModel>; 
    private _mainHttpFacade: MainHttpFacade;

    constructor(mainHttpFacade: MainHttpFacade) {
        this.childrenCards = null;
        this._mainHttpFacade = mainHttpFacade;
    }
    
    getChildrenCardsFromServer(): void {
        this.childrenCards = this._mainHttpFacade.getChildrenCards();
    }
}

