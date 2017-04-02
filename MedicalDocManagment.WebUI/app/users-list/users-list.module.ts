import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UsersListComponent } from './users-list.component';
import UsersListWithoutPaginationComponent from './users-list-without-pagination.component';
import UsersListPageComponent from './page/page.component';
import UsersListPageWithoutPaginationComponent from './page/page-without-pagination.component';
import ItemActionListEditButton from './page/item-actionlist-edit/button/button.component';
import ItemActionListEditModal from './page/item-actionlist-edit/modal/modal.component';
import UsersListPageItemActionListDeleteComponent from './page/item-actionlist-delete.component';
import UsersListPageItemActionListComponent from './page/item-actionlist.component';
import UsersListPageItemComponent from './page/item.component';
import { Ng2PaginationModule } from 'ng2-pagination';
import { SimpleNotificationsModule, PushNotificationsModule } from 'angular2-notifications';

@NgModule({
    imports: [CommonModule, FormsModule, HttpModule, Ng2PaginationModule, SimpleNotificationsModule,
              PushNotificationsModule],
    declarations: [
        UsersListComponent,
        UsersListWithoutPaginationComponent,
        UsersListPageComponent,
        UsersListPageWithoutPaginationComponent,
        ItemActionListEditButton,
        ItemActionListEditModal,
        UsersListPageItemActionListComponent,
        UsersListPageItemComponent,
        UsersListPageItemActionListDeleteComponent,
    ],
    exports: [UsersListComponent, UsersListWithoutPaginationComponent]
})
export class UsersListModule {
}
