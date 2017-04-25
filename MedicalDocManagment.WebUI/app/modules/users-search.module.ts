import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UsersListModule } from './users-list.module';

import { UsersSearchFormComponent } from '../components/user/users-search/users-search-form.component';
import UsersSearchOptionsComponent from '../components/user/users-search/search-options.component';

@NgModule({
    imports: [CommonModule, FormsModule, HttpModule, UsersListModule],
    declarations: [
        UsersSearchFormComponent,
        UsersSearchOptionsComponent
    ],
    exports: [UsersSearchFormComponent]
})
export default class UsersSearchModule {
}
