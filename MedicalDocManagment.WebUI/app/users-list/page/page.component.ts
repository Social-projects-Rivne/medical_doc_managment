import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';

import ItemComponent from './item.component';
import UsersModel from '../../models/usersmodel';

@Component({
    moduleId: module.id,
    selector: 'page',
    templateUrl: 'views/page.component.html',
    styleUrls: ['views/page.component.css']
})

export default class PageComponent {
    @Input() users: UsersModel;
    @Output() onUsersListEdit = new EventEmitter<string>();

    constructor() {
        this.users = new UsersModel(null);
    }

    onPageEdit(id: string) {
        this.onUsersListEdit.emit(id);
    }

}
