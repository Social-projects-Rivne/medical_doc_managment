import { Component, OnInit } from '@angular/core';
import { UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
//import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import PositionModel from "../../../models/positionmodel";

@Component({
    moduleId: module.id,
    selector: 'app-user-add',
    templateUrl: 'user-add.component.html',
    providers: [UserService/*, NotificationsService*/]
})
export class UserAddComponent implements OnInit {
    user: User = new User();
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
    constructor(private userService: UserService/*, private _service: NotificationsService*/) {}
    ngOnInit() {
        this.updatePositionsList();
    }
    submit() {
        this.userService.postData(this.user)
                        .subscribe(
                        (data) => {
                            console.log(data);
                            //this._service.success("Успіх", "Успішно додано користувача");
                        },
                        (error) => {
                            console.log(error);
                            //this._service.error("Помилка", "Відбулась помилка при додаванні користувача");
                        }
        );
    }
    updatePositionsList(): void {
        this.userService.getPositionsList()
            .subscribe((data: PositionModel[]) => { this.positions = data;});
    }
}