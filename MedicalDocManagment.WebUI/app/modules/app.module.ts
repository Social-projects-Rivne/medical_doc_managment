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
import UsersSearchModule from "./users-search.module";
import ChildCardModule from "./child-card/child-card.module";

import { LoginAppComponent } from '../components/login-app.component';
import { LoginComponent } from '../components/login/login.component';
import AdminAppComponent from "../components/admin-app.component";
import { UserAddComponent } from "../components/user/user-add/user-add.component";
import { UsersListPaginateComponent } from "../components/user/users-list/users-list-paginate/users-list-paginate.component";
import { HomeAdminComponent } from "../components/home/admin/home-admin.component";
import { HomeMainComponent } from "../components/home/main/home-main.component";
import { HeaderAdminComponent } from "../components/header/admin/header-admin.component";
import { HeaderMainComponent } from "../components/header/main/header-main.component";
import MainAppComponent from '../components/main-app.component';
import MainAppService from "../services/main-app.service";
import ChildCardAddParentComponent from "../components/childrens-card/parent/child-card-add-parent.component";
import ChildrenCardAddComponent from "../components/childrens-card/children-cards-list/add/children-card-add.component";
import ViewPatientDataComponent from "../components/childrens-card/view-patient-data/view-patient-data.component";
import { ImageUploadModule } from "angular2-image-upload";
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        UsersListModule,
        UsersSearchModule,
        Ng2PaginationModule,
        SimpleNotificationsModule,
        PushNotificationsModule,
        ChildrenCardsListModule,
        ChildCardModule,
        ImageUploadModule.forRoot()
    ],
    declarations: [
        LoginAppComponent,
        LoginComponent,
        AdminAppComponent,
        UserAddComponent,
        UsersListPaginateComponent,
        HomeAdminComponent,
        HomeMainComponent,
        HeaderAdminComponent,
        HeaderMainComponent,
        MainAppComponent,
        ChildCardAddParentComponent,
        ChildrenCardAddComponent,
        ViewPatientDataComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        MainAppService
    ],
    bootstrap: [LoginAppComponent]
})
export class AppModule { }
