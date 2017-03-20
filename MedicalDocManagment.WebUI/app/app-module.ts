import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app-component';

import { UsersListComponent } from './userslist-component';
import { UsersListItemComponent } from './userslistitem-component';
import { UsersListPaginationComponent } from './userslistpagination-component';

@NgModule({
        imports: [BrowserModule, FormsModule],
        declarations: [AppComponent,

            UsersListComponent,
            UsersListItemComponent,
            UsersListPaginationComponent,
        ],
        bootstrap: [AppComponent]
})
export class AppModule { }