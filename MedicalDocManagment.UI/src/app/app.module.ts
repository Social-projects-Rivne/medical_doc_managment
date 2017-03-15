import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './app.menu';
import { EmptyContentComponent } from './app.emptycontent';
import { UsersListComponent } from './users.list';

import { CONST_ROUTING } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        CONST_ROUTING
    ],

    declarations: [
        AppComponent,
        MenuComponent,
        EmptyContentComponent,
        UsersListComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

