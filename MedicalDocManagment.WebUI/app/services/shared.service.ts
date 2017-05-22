import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';

import UserModel from "../models/usermodel";
import PositionModel from "../models/positionmodel";

import { AuthenticationService } from './authentication.service';

@Injectable()
export default class SharedService {

    public readonly notificationOptions = {
        timeOut: 5000,
        lastOnBottom: true,
        clickToClose: true,
        maxLength: 0,
        maxStack: 7,
        showProgressBar: true,
        pauseOnHover: false,
        preventDuplicates: false,
        preventLastDuplicates: 'visible',
        animate: 'scale',
        position: ['right', 'bottom']
    };

    constructor( @Inject(AuthenticationService) private _authenticationService: AuthenticationService) {
    }

    getCurrentUser(): UserModel {
        let currentUser = this._getCurrentUserAsUserModel();

        return currentUser;
    }

    private _getCurrentUserAsUserModel(): UserModel {
        let currentUserPosition = new PositionModel();
        currentUserPosition.id = this._authenticationService.positionId;
        currentUserPosition.name = this._authenticationService.position;

        let currentUser = new UserModel();
        currentUser.id = this._authenticationService.id;
        currentUser.firstName = this._authenticationService.firstName;
        currentUser.secondName = this._authenticationService.secondName;
        currentUser.lastName = this._authenticationService.lastName;
        currentUser.email = this._authenticationService.email;
        currentUser.userName = this._authenticationService.username;
        currentUser.position = currentUserPosition;

        return currentUser;
    }

}
