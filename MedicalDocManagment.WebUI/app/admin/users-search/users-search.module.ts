import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UsersListModule } from '../users-list/users-list.module';

import { UsersSearchFormComponent } from './users-search-form.component';
import UsersSearchOptionsComponent from './search-options.component';

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
