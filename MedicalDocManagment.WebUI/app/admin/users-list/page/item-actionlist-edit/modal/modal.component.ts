import { Component, Input, OnInit } from '@angular/core';

import { HttpFacade } from "../../../../http.facade";
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';

import UserModel from "../../../../models/usermodel";
import PositionModel from '../../../../models/positionmodel';

@Component({
    moduleId: module.id,
    selector: 'item-actionlist-edit-modal',
    templateUrl: 'modal.component.html'
})
export default class ItemActionListEditModal implements OnInit {
    @Input() user: UserModel = new UserModel();
    positions: PositionModel[];
    public notificationOptions = {
        timeOut: 5000,
        lastOnBottom: true,
        clickToClose: true,
        maxLength: 0,
        maxStack: 7,
        showProgressBar: true,
        pauseOnHover: false,
        preventDuplicates: false,
        preventLastDuplicates: 'visible',
        animate: 'scale',
        position: ['right', 'bottom']
    };

    constructor(private _http: HttpFacade, private _service: NotificationsService) { }

    submit() {
        this._http.updateUser(this.user)
            .subscribe(
            (data) => {
                console.log(data);
                this._service.success("Успіх", "Успішно відредаговано користувача");
            },
            (error) => {
                console.log(error);
                this._service.error("Помилка", "Відбулась помилка при редагуванні користувача");
            }
        );
    }

    ngOnInit() {
        this.updatePositionsList();
    }

    updatePositionsList(): void {
        this._http.getPositionsList()
            .subscribe((data: PositionModel[]) => { this.positions = data; });
    }
}