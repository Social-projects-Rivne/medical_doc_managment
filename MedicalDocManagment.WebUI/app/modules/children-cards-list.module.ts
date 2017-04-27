import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import ChildrenCardsListComponent from '../components/childrens-card/children-cards-list/children-cards-list.component';
import ChildrenCardsListWithoutLazyComponent from '../components/childrens-card/children-cards-list/children-cards-list-without-lazy.component';
import ChildrenCardsListItemComponent from '../components/childrens-card/children-cards-list/children-cards-list-item.component';

import ChildrenCardService from '../services/children-card.service';

import { AuthGuard } from '../services/guards/auth.guard';
import { AuthenticationService } from '../services/authentication.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        MomentModule,
        InfiniteScrollModule
    ],
    declarations: [
        ChildrenCardsListComponent,
        ChildrenCardsListWithoutLazyComponent,
        ChildrenCardsListItemComponent
    ],
    providers: [
        ChildrenCardService,
        AuthGuard,
        AuthenticationService
    ],
    exports: [ChildrenCardsListComponent, ChildrenCardsListWithoutLazyComponent]
})
export default class ChildrenCardsListModule {
}
