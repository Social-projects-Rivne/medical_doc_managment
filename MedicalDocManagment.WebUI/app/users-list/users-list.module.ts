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
import UsersListPaginationComponent from './pagination.component';

@NgModule({
    imports: [CommonModule, FormsModule, HttpModule],
    declarations: [
        UsersListComponent,
        UsersListPageComponent,
        ItemActionListEditButton,
        ItemActionListEditModal,
        UsersListPageItemActionListComponent,
        UsersListPageItemComponent,
        UsersListPaginationComponent
    ],
    exports: [UsersListComponent]
})
export class UsersListModule {
}