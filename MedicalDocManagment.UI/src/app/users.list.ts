import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from './http.service';


@Component({
    selector: 'emptyContent',
    templateUrl: './app/views/users.list.html',
    providers: [HttpService]
})

export class UsersListComponent {
    users = this.getUsersList();

    constructor(private httpService: HttpService) { }

    ngOnInit() {
        this.getUsersList()
    }

    getUsersList() {
        this.httpService.getUsersList().subscribe(
            (data: Response) => { this.users = data.json() });
    }

}

