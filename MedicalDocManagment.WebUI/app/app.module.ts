/**
 * @fileoverview This file defines AppModule — root module of front-end side of application.
 * @author Rv-023.Net
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UsersListModule } from './userslist/users-list.module';
import { UserAddComponent } from './user-add/user-add.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UsersListModule
  ],
  declarations: [
    AppComponent,
    UserAddComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
