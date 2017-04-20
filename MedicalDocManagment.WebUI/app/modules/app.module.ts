import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthenticationService } from '../services/authentication.service';
import { AuthGuard } from '../services/guards/auth.guard';

import { routing } from '../routes/app.routing';

import { UsersListModule } from "./users-list.module";
import { Ng2PaginationModule } from 'ng2-pagination';
import { SimpleNotificationsModule, PushNotificationsModule } from 'angular2-notifications';
import ChildrenCardsListModule from "./children-cards-list.module";

import { LoginAppComponent } from '../components/login-app.component';
import { LoginComponent } from '../components/login/login.component';
import { AdminAppComponent } from "../components/admin-app.component";
import { UserAddComponent } from "../components/user/user-add/user-add.component";
import { UsersListPaginateComponent } from "../components/user/users-list/users-list-paginate/users-list-paginate.component";
import { UsersSearchFormComponent } from "../components/user/users-search/users-search-form.component";
import { HomeComponent } from "../components/home/home.component";
import { HeaderComponent } from "../components/header/header.component";
import MainAppComponent from '../components/main-app.component';
import ChildCardAddParentComponent from "../components/childrens-card/parent/child-card-add-parent.component";
import ChildrenCardAddComponent from "../components/childrens-card/children-cards-list/add/children-card-add.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        UsersListModule,
        Ng2PaginationModule,
        SimpleNotificationsModule,
        PushNotificationsModule,
           ChildrenCardsListModule
 ],
    declarations: [
        LoginAppComponent,
        LoginComponent,
        AdminAppComponent,
        UserAddComponent,
        UsersListPaginateComponent,
        UsersSearchFormComponent,
        HomeComponent,
        HeaderComponent,
           MainAppComponent,
        ChildCardAddParentComponent,
        ChildrenCardAddComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService
    ],
    bootstrap: [LoginAppComponent, AdminAppComponent, MainAppComponent]
})
export class AppModule { }
