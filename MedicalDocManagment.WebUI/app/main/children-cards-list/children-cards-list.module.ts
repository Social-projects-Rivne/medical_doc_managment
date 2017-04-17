import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import ChildrenCardsListComponent from './children-cards-list.component';
import ChildrenCardsListItemComponent from './children-cards-list-item.component';
import { MainHttpFacade } from '../main-http.facade';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [
        ChildrenCardsListComponent,
        ChildrenCardsListItemComponent
    ],
    providers: [MainHttpFacade],
    exports: [ChildrenCardsListComponent]
})
export default class ChildrenCardsListModule {
}
