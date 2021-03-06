﻿import { Component, Input, OnInit } from '@angular/core';

import SharedService from "../../../../../../../../services/shared.service";
import { HttpFacade } from "../../../../../../../../services/http.facade";
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';

import UserModel from "../../../../../../../../models/usermodel";
import PositionModel from '../../../../../../../../models/positionmodel';

declare let $: any;

@Component({
    moduleId: module.id,
    selector: 'item-actionlist-edit-modal',
    templateUrl: 'modal.component.html',
    providers: [
        SharedService
    ]
})
export default class ItemActionListEditModal implements OnInit  {
    @Input() user: UserModel = new UserModel();
    @Input() tempUser: UserModel = new UserModel();
    positions: PositionModel[];
    userImage: any;
    showImageInvalidMessage: boolean = false;
    showImageSelectedMessage: boolean = false;
    notificationOptions: any;

    constructor(private _http: HttpFacade,
                private _service: NotificationsService,
                private _sharedService: SharedService) { }

    imageRemoved(event) {
        this.resetImage();
        this.resetMessages();
    }
    resetImage() {
        this.userImage = null;
    }
    resetMessages() {
        this.showImageSelectedMessage = false;
        this.showImageInvalidMessage = false;
    }
    imageUploaded(event) {
        this.userImage = event.file;
        this.showImageSelectedMessage = true;
        this.showImageInvalidMessage = false;
    }
    onCancel() {
        this.resetImage();
        this.resetMessages();
    }
    submit() {
        this._http.updateUserWithImage(this.tempUser, this.userImage)
            .subscribe(
                (data) => {
                    console.log(data);
                    this.user.clone(this.tempUser);
                    this.resetImage();
                    this.resetMessages();
                    let updatedPhoto = JSON.parse(data._body).photo;
                    this.user.photo = updatedPhoto;
                    this._service.success("Успіх", "Успішно відредаговано користувача");
                    $('#userEditModal').modal('hide');
                },
                (error) => {
                    console.log(error);
                    this.resetImage();
                    this._service.error("Помилка", "Відбулась помилка при редагуванні користувача");
                }
            );
    }

    ngOnInit() {
        this.updatePositionsList();
        this.notificationOptions = this._sharedService.notificationOptions;
    }

    updatePositionsList(): void {
        this._http.getPositionsList()
            .subscribe((data: PositionModel[]) => { this.positions = data; });
    }
}
