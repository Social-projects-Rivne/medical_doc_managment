import { Component, Input } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import UserModel from '../../models/usermodel';
import { HttpFacade } from '../../services/http.facade';

@Component({
    moduleId: module.id,
    selector: 'users-lfs',
    template: '{{lfs}}'
})
export default class UsersLfsComponent {
    private _authenticationService: AuthenticationService;
    private _id: string;
    private _httpFacade: HttpFacade;
    private _user: UserModel;

    constructor(authenticationService: AuthenticationService, httpFacade: HttpFacade) {
        this._authenticationService = authenticationService;
        this._id = null;
        this._httpFacade = httpFacade;
    }

    @Input()
    set id(value: string) {
        this._id = value;
        this._user = null;
        if (this._id) {
            this._httpFacade.getUserById(this._id).subscribe(
                (userModel: UserModel) => {
                    this._user = userModel;
                }
            );
        }
    }

    get lfs(): string {
        if (this._user) {
            let firstName = this._user.firstName;
            let f = firstName ? (firstName.length > 0 ? firstName[0] : '') : '';
            let secondName = this._user.secondName;
            let s = secondName ? (secondName.length > 0 ? secondName[0] : '') : '';

            return (this._user.lastName + ' ' + f + '. ' + s + '.');
        }
        else {
            return "";
        }
    }
}