import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UsersListModule } from './users-list/users-list.module';
import { UsersSearchFormComponent } from './users-search-form.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UsersListModule
  ],
  declarations: [
    AppComponent,
    UserAddComponent,
    UsersSearchFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
