import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UsersListComponent } from './users-list.component';
import { PageComponent } from './page/page.component';
import { ItemComponent } from './page/item.component';
import { ItemActionListComponent } from './page/item-actionlist.component';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule, FormsModule, HttpModule],
  declarations: [
    UsersListComponent,
    PageComponent,
    ItemActionListComponent,
    ItemComponent,
    PaginationComponent
  ],
  exports: [UsersListComponent]
})
export class UsersListModule { }