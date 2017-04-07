import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MainHttpFacade } from './main-http.facade';
import ParentModel from './models/parent.model';

declare var jQuery: any;

@Component({
    moduleId: module.id,
    selector: 'child-card-add-parent',
    templateUrl: 'child-card-add-parent.component.html',
    providers: [MainHttpFacade]
})

export default class ChildCardAddParentComponent {
    @Output() parentAdded: EventEmitter<string>;

    private _isAdding: boolean;
    private _isErrorOnAdding: boolean;
    private _lastErrorMessage: string;
    private _mainHttpFacade: MainHttpFacade;
    private _parent: ParentModel;


    constructor(mainHttpFacade: MainHttpFacade) {
        this.parentAdded = new EventEmitter<string>();

        this._isAdding = false;
        this._isErrorOnAdding = false;
        this._lastErrorMessage = null;
        this._mainHttpFacade = mainHttpFacade;
        this._parent = new ParentModel();
    }

    private _isValid(): boolean {
        return (this._parent.f_name && (this._parent.f_name.trim().length > 0) &&
                    this._parent.s_name && (this._parent.s_name.trim().length > 0) &&
                    this._parent.l_name && (this._parent.l_name.trim().length > 0) &&
                    this._parent.work && (this._parent.work.trim().length > 0) &&
                    this._parent.phone && (this._parent.phone.trim().length > 0)
        );
    }

    private _onAdd(): void {
        this._isAdding = true;
        this._isErrorOnAdding = false;
        this._mainHttpFacade.addParent(this._parent)
            .subscribe((result: ParentModel) => {
                if (result) {
                    this._isAdding = false;                   
                    jQuery('#childCardAddParentModal').modal('hide');
                    this.parentAdded.emit(result.id);
                }
            },
            (error: any) => {
                this._isAdding = false;
                this._isErrorOnAdding = true;
                this._lastErrorMessage = error;
            });
    }
}

