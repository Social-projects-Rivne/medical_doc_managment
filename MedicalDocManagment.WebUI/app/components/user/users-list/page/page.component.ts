import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';

import ItemComponent from './item/item.component';
import UsersModel from '../../../../models/usersmodel';

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
    @Output() onUsersListEdit = new EventEmitter<string>();

    @Output() onPageChange = new EventEmitter<number>();
    constructor() {
        //this.users = new UsersModel(null);
    }
    changePage(page: number) {
        if (!this.loading) {
            this.onPageChange.emit(page);
        }
    }
    onPageEdit(id: string) {
        this.onUsersListEdit.emit(id);
    }
}
