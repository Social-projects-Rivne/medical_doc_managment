import { Component, Input, OnInit } from '@angular/core';

import { HttpFacade } from "../../../../../../../../services/http.facade";
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';

import UserModel from "../../../../../../../../models/usermodel";
import PositionModel from '../../../../../../../../models/positionmodel';

@Component({
    moduleId: module.id,
    selector: 'item-actionlist-edit-modal',
    templateUrl: 'modal.component.html'
})
export default class ItemActionListEditModal implements OnInit {
    @Input() user: UserModel = new UserModel();
    positions: PositionModel[];
    userImage: any;
    showImageInvalidMessage: boolean = false;
    showImageSelectedMessage: boolean = false;
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
        this._http.updateUserWithImage(this.user, this.userImage)
            .subscribe(
            (data) => {
                this.resetImage();
                this.resetMessages();
                let updatedAvatar = JSON.parse(data._body).avatar;
                this.user.avatar = updatedAvatar;
                this._service.success("Успіх", "Успішно відредаговано користувача");
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
    }

    updatePositionsList(): void {
        this._http.getPositionsList()
            .subscribe((data: PositionModel[]) => { this.positions = data; });
    }
}