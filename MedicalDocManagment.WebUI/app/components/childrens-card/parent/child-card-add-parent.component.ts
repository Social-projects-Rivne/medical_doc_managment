﻿import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

declare var jQuery: any;

import ChildrenCardService from "../../../services/children-card.service";
import flexiblePhoneMask from "./flexible-phone-mask.function";
import ParentModel from "../../../models/child-card/parent.model";

@Component({
    moduleId: module.id,
    selector: 'child-card-add-parent',
    templateUrl: 'child-card-add-parent.component.html',
    providers: [ChildrenCardService],
    styleUrls: ['child-card-add-parent.component.css']
})

export default class ChildCardAddParentComponent {
    flexiblePhoneMask = flexiblePhoneMask;
    @Output() parentAddedEvent: EventEmitter<ParentModel>;

    private _childrenCardService: ChildrenCardService;
    private _isAdding: boolean;
    private _isErrorOnAdding: boolean;
    private _lastErrorMessage: string;
    private _parent: ParentModel;

    constructor(childrenCardService: ChildrenCardService) {
        this.parentAddedEvent = new EventEmitter<ParentModel>();

        this._childrenCardService = childrenCardService;
        this._isAdding = false;
        this._isErrorOnAdding = false;
        this._lastErrorMessage = null;
        this._parent = new ParentModel();
    }    

    private _onSave(form: FormGroup): void {
        this._isAdding = true;
        this._isErrorOnAdding = false;
        this._childrenCardService.addParent(this._parent)
            .subscribe((result: any) => {
                if (result) {
                    this._isAdding = false;
                    // `result` has `ScalarObservable` type. It has `value` property, that contains Parent object from Controller
                    let parent = new ParentModel(result.value);
                    this.parentAddedEvent.emit(parent);
                    jQuery('#childCardAddParentModal').modal('hide');
                    form.reset();
                }
            },
            (error: any) => {
                this._isAdding = false;
                this._isErrorOnAdding = true;
                this._lastErrorMessage = error;
            });
    }
}
