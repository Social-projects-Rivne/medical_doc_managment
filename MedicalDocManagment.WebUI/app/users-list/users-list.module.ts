import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UsersListComponent } from './users-list.component';
import UsersListPageComponent from './page/page.component';
import ItemActionListEditButton from './page/item-actionlist-edit/button/button.component';
import ItemActionListEditModal from './page/item-actionlist-edit/modal/modal.component';
import UsersListPageItemActionListComponent from './page/item-actionlist.component';
import UsersListPageItemComponent from './page/item.component';
import { Ng2PaginationModule } from 'ng2-pagination';

@NgModule({
    imports: [CommonModule, FormsModule, HttpModule, Ng2PaginationModule],
    declarations: [
        UsersListComponent,
        UsersListPageComponent,
        ItemActionListEditButton,
        ItemActionListEditModal,
        UsersListPageItemActionListComponent,
        UsersListPageItemComponent
    ],
    exports: [UsersListComponent]
})
export class UsersListModule {
}