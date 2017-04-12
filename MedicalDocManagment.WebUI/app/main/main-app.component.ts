import { Component, AfterViewInit, ViewChild } from '@angular/core';

import ChildrenCardsListComponent from './children-cards-list/children-cards-list.component';

@Component({
    moduleId: module.id,
    selector: 'main-app-component',
    templateUrl: 'main-app.component.html'
})
export default class MainAppComponent implements AfterViewInit {
    @ViewChild('childrenCardsList') private _childrenCardsList;

    constructor() {
        this._childrenCardsList = null;
    }

    ngAfterViewInit() {
        this._childrenCardsList.getChildrenCardsFromServer();
    }
} 
