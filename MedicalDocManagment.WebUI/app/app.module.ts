/**
 * @fileoverview This file defines AppModule — root module of front-end side of application.
 * @author Rv-023.Net
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UsersListModule } from './users-list/users-list.module';
import { UserAddComponent } from './user-add/user-add.component';
import { UsersListPaginateComponent } from './users-list-paginate/users-list-paginate.component';
import {Ng2PaginationModule} from 'ng2-pagination';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UsersListModule,
    Ng2PaginationModule
  ],
  declarations: [
    AppComponent,
    UserAddComponent,
    UsersListPaginateComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
