import { Component, EventEmitter, Output } from '@angular/core';

declare var jQuery: any;

@Component({
    moduleId: module.id,
    selector: '[edit-confirmation]',
    templateUrl: 'confirmation.modal.html'
})
export default class ConfirmationModal {
    @Output() onConfirmedEdit: EventEmitter<void>;

    constructor() {
        this.onConfirmedEdit = new EventEmitter<void>();
    }

    hideModal(): void {
        jQuery("#userEditConfirmationModal").modal("hide");
    }

    onYes(): void {
        this.hideModal();
        this.onConfirmedEdit.emit();
    }
}