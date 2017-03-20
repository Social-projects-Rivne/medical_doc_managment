import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';

import UserModel from './models/usermodel'

@Component({
    selector: 'userUsersList',
    templateUrl: './app/views/user-userslist-component.html'
})

export class UserUsersListComponent {
    @Input() user: UserModel;
}

