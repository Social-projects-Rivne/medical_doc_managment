import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';

import UserModel from '../../../../models/usermodel'
import { HttpFacade } from '../../../../http.facade';
import { ItemActionListNotificationService }
    from '../../services/item-actionlist-notification.service'

@Component({
    moduleId: module.id,
    selector: 'item-ActionList-Delete',
    templateUrl: 'delete.component.html',
    providers: [HttpFacade]
})
export default class DeleteComponent {
    @Input() user: UserModel;

    private _httpFacade: HttpFacade;

    constructor(httpFacade: HttpFacade,
        private itemNotificationService: ItemActionListNotificationService)
    {
        this.user = new UserModel(null);
        this._httpFacade = httpFacade;
    }

    onConfirmedDelete(): void {
        this._httpFacade.deleteUser(this.user)
            .subscribe(
            (result: boolean) => {
                if (result) this.user.isActive = false;
                this.itemNotificationService.addNotification("deleteSuccess");
            },
            (error) => {
                console.log(error);
                this.itemNotificationService.addNotification("deleteError");
            }
            );
    }
}

