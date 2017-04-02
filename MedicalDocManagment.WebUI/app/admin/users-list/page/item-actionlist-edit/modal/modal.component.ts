import { Component, Input, OnInit } from '@angular/core';

import { HttpFacade } from "../../../../../http.facade";

import UserModel from "../../../../../models/usermodel";
import PositionModel from '../../../../../models/positionmodel';

@Component({
    moduleId: module.id,
    selector: 'item-actionlist-edit-modal',
    templateUrl: 'modal.component.html'
})
export default class ItemActionListEditModal implements OnInit {
    @Input() user: UserModel = new UserModel();
    positions: PositionModel[];

    constructor(private _http: HttpFacade) { }

    submit() {
        this._http.updateUser(this.user)
            .subscribe((data) => { console.log(data) });
    }

    ngOnInit() {
        this.updatePositionsList();
    }

    updatePositionsList(): void {
        this._http.getPositionsList()
            .subscribe((data: PositionModel[]) => { this.positions = data; });
    }
}