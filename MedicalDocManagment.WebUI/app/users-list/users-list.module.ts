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
import UsersListPageItemActionListEditConfirmationModal from
    './page/item-actionlist-edit/modal/confirmation/confirmation.modal';
import UsersListPageItemActionListDeleteComponent from './page/item-actionlist-delete.component';
import UsersListPageItemActionListComponent from './page/item-actionlist.component';
import UsersListPageItemActionListDeleteComponent from './page/item-actionlist-delete/delete.component';
import UsersListPageItemActionListDeleteConfirmationModal from
    './page/item-actionlist-delete/confirmation/confirmation.modal';
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
        UsersListPageItemActionListEditConfirmationModal,
        UsersListPageItemActionListComponent,
        UsersListPageItemComponent,
        UsersListPageItemActionListDeleteComponent,
        UsersListPageItemActionListDeleteConfirmationModal
    ],
    exports: [UsersListComponent, UsersListWithoutPaginationComponent]
})
export class UsersListModule {
}
