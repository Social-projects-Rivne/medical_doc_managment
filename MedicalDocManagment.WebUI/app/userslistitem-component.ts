import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';

import UserModel from './models/usermodel'

@Component({
    selector: '[usersListItem]',
    templateUrl: './app/views/userslistitem-component.html'
})

export class UsersListItemComponent {
    @Input() user: UserModel;
}

