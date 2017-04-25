import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';

import ItemActionListComponent from './item-actionlist/item-actionlist.component';
import UserModel from '../../../../../models/usermodel'

@Component({
    moduleId: module.id,
    selector: '[item]',
    templateUrl: 'item.component.html',
    styleUrls: ['item.component.css'],
})

export default class ItemComponent {
    /**
     * Property which receives data about user from users list.
     * @type {UserModel}
     */
    @Input() user: UserModel;
    @Output() onPageEdit = new EventEmitter<string>();

    constructor() { }

    onItemEdit(id: string) {
        this.onPageEdit.emit(id);
    }
}

