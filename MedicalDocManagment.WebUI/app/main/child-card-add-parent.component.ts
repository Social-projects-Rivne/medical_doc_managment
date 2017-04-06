import { Component, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MainHttpFacade } from './main-http.facade';
import ParentModel from './models/parent.model';

@Component({
    moduleId: module.id,
    selector: 'child-card-add-parent',
    templateUrl: 'child-card-add-parent',
    providers: [MainHttpFacade]
})

export default class ChildCardAddParentComponent {
    @Output() addedParentId: number;

    private _isAdding: boolean;
    private _isErrorOnAdding: boolean;
    private _lastErrorMessage: string;
    private _mainHttpFacade: MainHttpFacade;
    private _parent: ParentModel;


    constructor(mainHttpFacade: MainHttpFacade) {
        this._isAdding = false;
        this._isErrorOnAdding = false;
        this._lastErrorMessage = null;
        this._mainHttpFacade = mainHttpFacade;
        this._parent = new ParentModel();
    }

    private _addParent(): void {
        this._isAdding = true;
        this._mainHttpFacade.addParent(this._parent)
            .subscribe((result: ParentModel) => {
                if (result) {
                    this.addedParentId = result.id;
                    this._isAdding = false;                   
                    // TODO closing

                }
            },
            (error: any) => { throw error; });
    }
}

