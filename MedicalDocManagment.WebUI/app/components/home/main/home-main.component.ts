﻿import { Component, AfterViewInit, ViewChild } from '@angular/core';

import ChildrenCardsListComponent from '../../../modules/children-cards-list.module';

@Component({
    moduleId: module.id,
    templateUrl: 'home-main.component.html',
})
export class HomeMainComponent implements AfterViewInit {
    @ViewChild('childrenCardsList') private _childrenCardsList;

    ngAfterViewInit() {
        this._childrenCardsList.getChildrenCardsFromServer();
    }
}
