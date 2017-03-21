/**
 * @fileoverview This file defines AppModule — root module of front-end side of application.
 * @author Rv-023.Net
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { UsersListComponent } from './userslist.component';
import { UsersListItemComponent } from './userslist-item.component';
import { UsersListItemActionListComponent } from './userslist-item-actionlist.component';
import { UsersListPaginationComponent } from './userslist-pagination.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [AppComponent,
    UsersListComponent,
    UsersListItemComponent,
    UsersListPaginationComponent,
    UsersListItemActionListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }