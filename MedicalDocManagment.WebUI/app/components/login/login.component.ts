import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { AuthenticationService } from "../../services/authentication.service";

@Component({
    selector: 'app-login',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
@Injectable()
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        @Inject(DOCUMENT) private document: any) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    if (this.authenticationService.role == "admin") {
                        this.document.location.href = "/app/add";
                    }
                    else if (this.authenticationService.role == "user") {
                        this.document.location.href = "/app/main/index.html";
                    }
                    

                } else {
                    // login failed
                    this.error = 'Помилка аутентифікації, неправильне імʼя користувача або пароль';
                    this.loading = false;
                    this.authenticationService.logout();
                }
            },
            error => {
                console.log(error);
                this.error = 'Помилка аутентифікації, неправильне імʼя користувача або пароль';
                this.loading = false;
                this.authenticationService.logout();
            });
    }
}