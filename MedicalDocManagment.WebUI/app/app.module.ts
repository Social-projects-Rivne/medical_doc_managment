/**
 * @fileoverview This file defines AppModule — root module of front-end side of application.
 * @author Rv-023.Net
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { UserAddComponent } from './user-add/user-add.component';
import { UsersListComponent } from './userslist/userslist.component';
import { UsersListPageComponent } from './userslist/page/userslist-page.component';
import { UsersListPageItemComponent } from './userslist/page/userslist-page-item.component';
import { UsersListPageItemActionListComponent } from './userslist/page/userslist-page-item-actionlist.component';
import { UsersListPaginationComponent } from './userslist/userslist-pagination.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [AppComponent,
    UserAddComponent,
    UsersListComponent,
    UsersListPageComponent,
    UsersListPageItemActionListComponent,
    UsersListPageItemComponent,
    UsersListPaginationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
