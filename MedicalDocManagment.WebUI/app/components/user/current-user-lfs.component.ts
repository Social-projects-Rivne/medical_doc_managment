import { Component } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'current-user-lfs',
    template: '{{lfs}}'
})
export default class CurrentUserLfsComponent {
    private _authenticationService: AuthenticationService;

    constructor(authenticationService: AuthenticationService) {
        this._authenticationService = authenticationService;
    }

    get lfs(): string {
        let firstName = this._authenticationService.firstName;
        let f = firstName ? (firstName.length > 0 ? firstName[0] : '') : '';
        let secondName = this._authenticationService.secondName;
        let s = secondName ? (secondName.length > 0 ? secondName[0] : '') : '';

        return (this._authenticationService.lastName + ' '+ f + '. ' + s + '.');
    }
}