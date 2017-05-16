import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UsersListComponent } from '../components/user/users-list/users-list.component';
import UsersListWithoutPaginationComponent from  '../components/user/users-list/users-list-without-pagination/users-list-without-pagination.component';
import UsersListPageComponent from '../components/user/users-list/page/page.component';
import UsersListPageWithoutPaginationComponent from '../components/user/users-list/page/page-without-pagination/page-without-pagination.component';
import UsersListPageHeaderComponentComponent from '../components/user/users-list/page/page-header.component';
import ItemActionListEditButton from '../components/user/users-list/page/item/item-actionlist/item-actionlist-edit/button/button.component';
import ItemActionListEditModal from '../components/user/users-list/page/item/item-actionlist/item-actionlist-edit/modal/modal.component';
import UsersListPageItemActionListEditConfirmationModal from '../components/user/users-list/page/item/item-actionlist/item-actionlist-edit/modal/confirmation/confirmation.modal';
import UsersListPageItemActionListComponent from '../components/user/users-list/page/item/item-actionlist/item-actionlist.component';
import UsersListPageItemActionListDeleteComponent from '../components/user/users-list/page/item/item-actionlist/item-actionlist-delete/delete.component';
import UsersListPageItemActionListDeleteConfirmationModal from '../components/user/users-list/page/item/item-actionlist/item-actionlist-delete/confirmation/confirmation.modal';
import UsersListPageItemComponent from '../components/user/users-list/page/item/item.component';
import { ItemActionListNotificationService } from '../services/item-actionlist-notification.service'
import { Ng2PaginationModule } from 'ng2-pagination';
import { SimpleNotificationsModule, PushNotificationsModule } from 'angular2-notifications';
import { ImageUploadModule } from "angular2-image-upload";

@NgModule({
    imports: [
        CommonModule, 
        FormsModule, 
        HttpModule, 
        Ng2PaginationModule, 
        SimpleNotificationsModule,
        PushNotificationsModule,
        ImageUploadModule.forRoot()
    ],
    declarations: [
        UsersListComponent,
        UsersListWithoutPaginationComponent,
        UsersListPageComponent,
        UsersListPageWithoutPaginationComponent,
        UsersListPageHeaderComponentComponent,
        ItemActionListEditButton,
        ItemActionListEditModal,
        UsersListPageItemActionListEditConfirmationModal,
        UsersListPageItemActionListComponent,
        UsersListPageItemComponent,
        UsersListPageItemActionListDeleteComponent,
        UsersListPageItemActionListDeleteConfirmationModal
    ],
    providers: [ItemActionListNotificationService],
    exports: [
        UsersListComponent, 
        UsersListWithoutPaginationComponent
    ]
})
export class UsersListModule { }
