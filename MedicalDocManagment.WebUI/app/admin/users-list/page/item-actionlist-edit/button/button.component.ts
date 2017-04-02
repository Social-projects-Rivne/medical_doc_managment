import { Component, Input, Output, EventEmitter } from '@angular/core';

import UserModel from "../../../../models/usermodel";

@Component({
    moduleId: module.id,
    selector: 'item-actionlist-edit-button',
    templateUrl: 'button.component.html'
})
export default class ItemActionListEditButton {
    @Input() user: UserModel = new UserModel();
    @Output() onActionListEdit = new EventEmitter<string>();

    onEditBtn(id: string) {
        this.onActionListEdit.emit(id);
    }
    
}
