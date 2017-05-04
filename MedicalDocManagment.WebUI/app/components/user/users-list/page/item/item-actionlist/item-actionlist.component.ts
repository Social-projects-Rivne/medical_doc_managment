import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';

import UserModel from '../../../../../../models/usermodel'

@Component({
    moduleId: module.id,
    selector: '[item-ActionList]',
    templateUrl: 'item-actionlist.component.html'
})

export default class ItemActionListComponent {
    @Input() user: UserModel;
    @Output() onItemEdit = new EventEmitter<UserModel>();

    constructor() {
        this.user = new UserModel();
    }

    onActionListEdit(userForEdit: UserModel) {
        this.onItemEdit.emit(userForEdit);
    }

}
