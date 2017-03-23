import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UsersListComponent } from './users-list.component';
import UsersListPageComponent from './page/page.component';
import UsersListPageItemActionListComponent from './page/item-actionlist.component';
import UsersListPageItemComponent from './page/item.component';
import UsersListPaginationComponent from './pagination.component';

@NgModule({
  imports: [CommonModule, FormsModule, HttpModule],
  declarations: [
    UsersListComponent,
    UsersListPageComponent,
    UsersListPageItemActionListComponent,
    UsersListPageItemComponent,
    UsersListPaginationComponent
  ],
  exports: [UsersListComponent]
})
export class UsersListModule { }