import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AdminComponent } from './admin.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UsersListModule } from './users-list/users-list.module';
import { UsersListPaginateComponent } from './users-list-paginate/users-list-paginate.component';
import { UsersSearchFormComponent } from './users-search/users-search-form.component';
import { Ng2PaginationModule } from 'ng2-pagination';
import { SimpleNotificationsModule, PushNotificationsModule } from 'angular2-notifications';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        UsersListModule,
        Ng2PaginationModule,
        SimpleNotificationsModule,
        PushNotificationsModule
    ],
    declarations: [
        AdminComponent,
        UserAddComponent,
        UsersListPaginateComponent,
        UsersSearchFormComponent
    ],
    exports: [AdminComponent]
})
export class AdminModule {
}
