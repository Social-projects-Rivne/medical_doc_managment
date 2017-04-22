import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
    moduleId: module.id,
    selector: 'app-header-admin',
    templateUrl: 'header-admin.component.html',
})
@Injectable()
export class HeaderAdminComponent implements OnInit {
    private username:string;
    constructor( private router: Router, @Inject(AuthenticationService) private authenticationService: AuthenticationService) { }
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