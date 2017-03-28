import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';

import ItemComponent from './item.component';
import UsersModel from '../../models/usersmodel';

@Component({
    moduleId: module.id,
    selector: 'page',
    templateUrl: 'views/page.component.html',
    styleUrls: ['views/page.component.css'],
})
export default class PageComponent {
    @Input() users: UsersModel;
    @Input() page: number;
    @Input() pageSize: number;
    @Input() total: number;
    @Output() onUsersListEdit = new EventEmitter<string>();

    @Output() onPageChange = new EventEmitter<number>();
    constructor() {
        //this.users = new UsersModel(null);
    }
    changePage(page: number) {
        this.onPageChange.emit(page);
    }
    onPageEdit(id: string) {
        this.onUsersListEdit.emit(id);
    }
}
