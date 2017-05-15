import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from "../../../services/authentication.service";
import MainAppService from "../../../services/main-app.service";

@Component({
    moduleId: module.id,
    selector: 'app-header-main',
    templateUrl: 'header-main.component.html',
})
@Injectable()
export class HeaderMainComponent implements OnInit {
    private username: string;
    private _mainAppService: MainAppService;

    constructor(private router: Router,
        @Inject(AuthenticationService) private authenticationService: AuthenticationService,
        mainAppService: MainAppService
    ) { 
        this._mainAppService = mainAppService;
    }

    get someChildCardIsSelected(): boolean {
        return (this._mainAppService.currentCard != null);
    }

    ngOnInit() {
        this.username = this.authenticationService.username;
    }
    logout(event) {
        event.preventDefault();
        this.authenticationService.logout();
        this.router.navigateByUrl("login");
        //this.document.location.href = "/app/core/index.html";
    }

}