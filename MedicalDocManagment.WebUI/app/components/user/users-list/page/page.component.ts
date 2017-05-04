import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';

import ItemComponent from './item/item.component';
import UsersModel from '../../../../models/usersmodel';
import UserModel from '../../../../models/usermodel';

@Component({
    moduleId: module.id,
    selector: 'page',
    templateUrl: 'page.component.html',
    styleUrls: ['page.component.css'],
})
export default class PageComponent {
    @Input() users: UsersModel;
    @Input() page: number;
    @Input() pageSize: number;
    @Input() total: number;
    @Input() loading: boolean;
    @Output() onUsersListEdit: EventEmitter<UserModel>;

    @Output() onPageChange = new EventEmitter<number>();

    constructor() {
        this.onUsersListEdit = new EventEmitter<UserModel>();
    }

    changePage(page: number) {
        if (!this.loading) {
            this.onPageChange.emit(page);
        }
    }

    onPageEdit(id: UserModel) {
        this.onUsersListEdit.emit(id);
    }
}
