import { Component, EventEmitter, Input, Output } from '@angular/core';

import UserModel from '../../../../models/usermodel'

@Component({
    moduleId: module.id,
    selector: '[delete-confirmation]',
    templateUrl: 'confirmation.modal.html'
})
export default class ConfirmationModal{
    @Input() user: UserModel;
    @Output() onConfirmedDelete: EventEmitter<void>;

    constructor() {
        this.onConfirmedDelete = new EventEmitter<void>();
    }

    onYes(): void {
        this.onConfirmedDelete.emit();
    }
}