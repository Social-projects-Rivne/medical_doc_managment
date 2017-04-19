import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { AuthenticationService } from "../../../shared/authentication.service";

@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: 'header.component.html',
})
@Injectable()
export class HeaderComponent implements OnInit {
    private username:string;
    constructor( @Inject(DOCUMENT) private document: any, private authenticationService: AuthenticationService) { }
    ngOnInit() {
        this.username = this.authenticationService.username;
    }
    logout(event) {
        event.preventDefault();
        this.document.location.href = "/app/core/index.html";
    }

}