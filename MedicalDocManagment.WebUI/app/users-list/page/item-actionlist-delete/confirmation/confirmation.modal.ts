import { Component, Input } from '@angular/core';

import UserModel from '../../../../models/usermodel'

@Component({
    moduleId: module.id,
    selector: 'delete-confirmation',
    templateUrl: 'confirmation.modal.html'
})
export default class ConfirmationModal {
    @Input() user: UserModel;
}