import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app-component';
import { UsersListComponent } from './userslist-component';
import { UsersListItemComponent } from './userslistitem-component';

@NgModule({
        imports: [BrowserModule, FormsModule],
        declarations: [AppComponent, UsersListComponent, UsersListItemComponent],
        bootstrap: [AppComponent]
})
export class AppModule { }