import { Inject, Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                @Inject(DOCUMENT) private document: any) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page
        this.document.location.href = "/app/core/index.html";
        //this.router.navigate(['/index.html']);
        return false;
    }
}