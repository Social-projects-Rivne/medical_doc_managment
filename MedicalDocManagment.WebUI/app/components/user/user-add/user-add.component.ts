import { Component, OnInit } from '@angular/core';
import { UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import PositionModel from "../../../models/positionmodel";
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'app-user-add',
    templateUrl: 'user-add.component.html',
    providers: [UserService, NotificationsService]
})
export class UserAddComponent implements OnInit {
    user: User = new User();
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
    constructor(private userService: UserService, private _service: NotificationsService) {}
    ngOnInit() {
        this.updatePositionsList();
    }
    ngAfterViewInit() {
        $('input[type=text]').tooltip({
            placement: "right",
            trigger: "focus",
            container: 'body'
        });
    }
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
    submit(event: Event) {
        event.preventDefault();
        this.userService.postDataWithImage(this.user, this.userImage)
            .subscribe(
            (data) => {
                console.log(data);
                this._service.success("Успіх", "Успішно додано користувача");
            },
            (error) => {
                console.log(error);
                let errorMessage = JSON.parse(error._body).message;
                if (errorMessage == "Image is not valid.") {
                    this.showImageInvalidMessage = true;
                }
                this._service.error("Помилка", "Відбулась помилка при додаванні користувача");
            }
            );
    }
    updatePositionsList(): void {
        this.userService.getPositionsList()
            .subscribe((data: PositionModel[]) => { this.positions = data;});
    }
}