import { Component, OnInit } from '@angular/core';
import { HttpService} from './http.service';
import {User} from './user';

@Component({
    selector: 'app-user-add',
    templateUrl: 'app/user-add/user-add.component.html',
    providers: [HttpService]
})
export class UserAddComponent {
    user: User = new User();
    constructor(private httpService: HttpService) { }
    submit() {
        this.httpService.postData(this.user)
            .subscribe((data) => { console.log(data) });
    }
}