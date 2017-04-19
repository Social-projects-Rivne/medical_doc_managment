import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import ChildrenCardsListComponent from '../components/childrens-card/children-cards-list/children-cards-list.component';
import ChildrenCardsListItemComponent from '../components/childrens-card/children-cards-list/children-cards-list-item.component';

import CildrensCardService from '../services/children-card.service';

import { AuthGuard } from '../../shared/guards/auth.guard';
import { AuthenticationService } from '../../shared/authentication.service';

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
    providers: [
        CildrensCardService,
        AuthGuard,
        AuthenticationService
    ],
    exports: [ChildrenCardsListComponent]
})
export default class ChildrenCardsListModule {
}
