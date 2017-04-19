import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng2PaginationModule } from 'ng2-pagination';
import { SimpleNotificationsModule, PushNotificationsModule } from 'angular2-notifications';

import { routing } from "../routes/admin-app.routing";

import { AuthenticationService } from "../../shared/authentication.service";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { AdminAppComponent } from "../components/admin-app.component";
import { UserAddComponent } from "../components/user/user-add/user-add.component";
import { UsersListPaginateComponent } from "../components/user/users-list/users-list-paginate/users-list-paginate.component";
import { UsersSearchFormComponent } from "../components/user/users-search/users-search-form.component";
import { HomeComponent } from "../components/home/home.component";
import { HeaderComponent } from "../components/header/header.component";
import { UsersListModule } from "./users-list.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        UsersListModule,
        Ng2PaginationModule,
        SimpleNotificationsModule,
        PushNotificationsModule,
        routing
    ],
    declarations: [
        AdminAppComponent,
        UserAddComponent,
        UsersListPaginateComponent,
        UsersSearchFormComponent,
        HomeComponent,
        HeaderComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService
    ],
    bootstrap: [AdminAppComponent]
})
export class AdminAppModule { }
