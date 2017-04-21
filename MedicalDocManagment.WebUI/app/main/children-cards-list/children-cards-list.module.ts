import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';

import ChildrenCardsListComponent from './children-cards-list.component';
import ChildrenCardsListItemComponent from './children-cards-list-item.component';
import ChildrensCardService from '../services/children-card.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MomentModule,
        HttpModule,
    ],
    declarations: [
        ChildrenCardsListComponent,
        ChildrenCardsListItemComponent
    ],
    providers: [ChildrensCardService],
    exports: [ChildrenCardsListComponent]
})
export default class ChildrenCardsListModule {
}
