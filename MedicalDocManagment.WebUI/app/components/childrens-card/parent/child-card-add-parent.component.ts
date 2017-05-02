import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

declare var jQuery: any;

import ChildrenCardService from "../../../services/children-card.service";
import ParentModel from "../../../models/parent.model";

@Component({
    moduleId: module.id,
    selector: 'child-card-add-parent',
    templateUrl: 'child-card-add-parent.component.html',
    providers: [ChildrenCardService],
    styleUrls: ['child-card-add-parent.component.css']
})

export default class ChildCardAddParentComponent {
    @Output() parentAdded: EventEmitter<string>;

    private _childrenCardService: ChildrenCardService;
    private _isAdding: boolean;
    private _isErrorOnAdding: boolean;
    private _lastErrorMessage: string;
    private _parent: ParentModel;

    constructor(childrenCardService: ChildrenCardService) {
        this.parentAdded = new EventEmitter<string>();

        this._childrenCardService = childrenCardService;
        this._isAdding = false;
        this._isErrorOnAdding = false;
        this._lastErrorMessage = null;
        this._parent = new ParentModel();
    }

    private _isValid(): boolean {
        return (
            this._parent.firstName && (this._parent.firstName.trim().length > 0) &&
            this._parent.secondName && (this._parent.secondName.trim().length > 0) &&
            this._parent.lastName && (this._parent.lastName.trim().length > 0) &&
            this._parent.work && (this._parent.work.trim().length > 0) &&
            this._parent.phone && (this._parent.phone.trim().length > 0)
        );
    }

    private _onSave(): void {
        this._isAdding = true;
        this._isErrorOnAdding = false;
        this._childrenCardService.addParent(this._parent)
            .subscribe((result: ParentModel) => {
                if (result) {
                    this._isAdding = false;                   
                    this.parentAdded.emit(result.id);
                    jQuery('#childCardAddParentModal').modal('hide');
                }
            },
            (error: any) => {
                this._isAdding = false;
                this._isErrorOnAdding = true;
                this._lastErrorMessage = error;
            });
    }
}
