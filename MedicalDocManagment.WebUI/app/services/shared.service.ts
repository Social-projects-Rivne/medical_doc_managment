import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IMyDpOptions } from 'mydatepicker';

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

    readonly myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
        dayLabels: { su: 'Нед', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Суб' },
        monthLabels: { 1: 'Січ', 2: 'Гру', 3: 'Бер', 4: 'Кві', 5: 'Тра', 6: 'Чер', 7: 'Лип', 8: 'Сер', 9: 'Вер', 10: 'Жов', 11: 'Лист', 12: 'Гру' },
        todayBtnTxt: 'Сьогодні'
    };

    constructor( @Inject(AuthenticationService) private _authenticationService: AuthenticationService,
                private _route: ActivatedRoute) {
    }

    getChildrenCardIdFromRoute(): number {
        let childCardid: number;
        this._route.params.subscribe(params => {
            childCardid = params['id'];
        });
        return childCardid;
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
