import { Component, OnInit } from '@angular/core';
import { HttpService} from './http.service';
import {User} from './user';

@Component({
    selector: 'app-user-add',
    //template: '<h1>User add is working</h1>'
    templateUrl: 'app/user-add/user-add.component.html',
    providers: [HttpService]
})
export class UserAddComponent {
    user: User = new User();
    constructor(private httpService: HttpService) { }
    submit(user) {
        this.httpService.postData(user)
            .subscribe((data) => { console.log(data) });
    }
}