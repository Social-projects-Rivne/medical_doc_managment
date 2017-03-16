import { Component } from '@angular/core';
import { Response } from '@angular/http';


@Component({
    selector: 'emptyContent',
    templateUrl: './app/views/users.list.html'
})

export class UsersListComponent {
    users = this.getUsersList();

    ngOnInit() {
        this.getUsersList()
    }

    getUsersList() {
        // mock-up
       return [
            { username: "Іван", email: "ivan@lala.net", position: "лікар", role: "якась роль", isactive: "так" },
            { username: "Сергій", email: "Sergiy@lala.net", position: "лікар", role: "якась роль", isactive: "так" },
            { username: "Степан", email: "Stepan@lala.net", position: "лікар", role: "якась роль", isactive: "ні" }
        ]
    }

}

