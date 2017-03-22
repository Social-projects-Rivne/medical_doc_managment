import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UsersListComponent } from './userslist.component';
import { UsersListPageComponent } from './page/userslist-page.component';
import { UsersListPageItemComponent } from './page/userslist-page-item.component';
import { UsersListPageItemActionListComponent } from './page/userslist-page-item-actionlist.component';
import { UsersListPaginationComponent } from './userslist-pagination.component';

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