import { Component, OnInit } from '@angular/core';
import { UserService} from './user.service';
import {User} from './user';
import PositionModel from '../models/positionmodel';

@Component({
    selector: 'app-user-add',
    templateUrl: 'app/user-add/views/user-add.component.html',
    providers: [UserService]
})
export class UserAddComponent implements OnInit {
    user: User = new User();
    positions: PositionModel[];
    constructor(private userService: UserService) {}
    ngOnInit() {
        this.updatePositionsList();
    }
    submit() {
        this.userService.postData(this.user)
            .subscribe((data) => { console.log(data) });
    }
    updatePositionsList(): void {
        this.userService.getPositionsList()
            .subscribe((data: PositionModel[]) => { this.positions = data;});
    }
}