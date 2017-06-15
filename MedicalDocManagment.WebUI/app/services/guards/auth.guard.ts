import { Inject, Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from "../authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                @Inject(AuthenticationService) private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        let currentRole = this.authenticationService.role;
       
        if (currentRole) {
            console.log("currentRole:");
            console.log(currentRole);
            let roles = route.data["roles"] as Array<string>;
            let isInCorrectRole = (roles == null || roles.indexOf(currentRole) != -1);
            if (isInCorrectRole) {
                return isInCorrectRole;
            }
            else {
                this.router.navigateByUrl("login");
                return isInCorrectRole;
            }
        }
        else {
            this.router.navigateByUrl("login");
            return false;
        }
        
    }
}