import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import ChildrenCardService from '../../../../services/children-card.service';
import ParentModel from '../../../../models/child-card/parent.model';

@Component({
    moduleId: module.id,
    selector: 'parents-list',
    templateUrl: 'parents-list.component.html'
})
export default class ParentsListComponent {
    private _childCardId: number;
    private _childrenCardService: ChildrenCardService;
    private _isLoading: boolean;
    private _isErrorOnLoading: boolean;
    private _lastLoadingErrorMessage: string;
    private _parents: ParentModel[];

    constructor(childrenCardService: ChildrenCardService,
        route: ActivatedRoute) {
        this._childrenCardService = childrenCardService;
        this._isLoading = false;
        this._isErrorOnLoading = false;
        this._lastLoadingErrorMessage = '';
        this._parents = [];
        this._childCardId = null;
    }

    private _loadParents(): void {
        if (this._childCardId != null) {
            this._isLoading = true;
            this._isErrorOnLoading = false;
            this._lastLoadingErrorMessage = '';

            this._parents = [];
            this._childrenCardService.getChildsParents(this._childCardId)
                .subscribe((parents: ParentModel[]) => {
                    this._parents = this._parents.concat(parents);
                    this._isLoading = false;
                },
                (error: any) => {
                    this._isLoading = false;
                    this._isErrorOnLoading = true;
                    this._lastLoadingErrorMessage = 'При отриманні інформації про батьків \
                    виникла помилка: \r\n' + <any>error;
                });
        }
    }

    @Input()
    set childCardId(newId: number) {
        if (this._childCardId != newId) {
            this._childCardId = newId;
            this._loadParents();
        }
    }
}