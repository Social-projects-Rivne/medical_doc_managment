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
import { UsersListItemComponent } from './userslist/userslist-item.component';
import { UsersListItemActionListComponent } from './userslist/userslist-item-actionlist.component';
import { UsersListPaginationComponent } from './userslist/userslist-pagination.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [AppComponent,
    UserAddComponent,
    UsersListComponent,
    UsersListItemComponent,
    UsersListPaginationComponent,
    UsersListItemActionListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
