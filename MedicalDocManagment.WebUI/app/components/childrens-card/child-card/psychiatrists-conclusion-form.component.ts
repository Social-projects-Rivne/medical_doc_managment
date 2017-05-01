﻿import { Component, EventEmitter, Input, Output } from '@angular/core';
declare var jQuery: any;

import ChildrenCardService from '../../../services/children-card.service';

@Component({
    moduleId: module.id,
    selector: 'psychiatrists-conclusion-form',
    templateUrl: 'psychiatrists-conclusion-form.component.html'
})
export default class PsychiatristsConclusionFormComponent {
    @Input() childCardId: number;
    @Output() conclusionAdded: EventEmitter<string>;
    private _childrenCardService: ChildrenCardService;
    private _conclusion: string;
    private _isErrorOnSaving: boolean;
    private _isSaving: boolean;
    private _lastErrorMessage: string;

    constructor(childrenCardService: ChildrenCardService) {
        this.childCardId = null;
        this.conclusionAdded = new EventEmitter<string>();
        this._childrenCardService = childrenCardService;
        this._isErrorOnSaving = false;
        this._isSaving = false;
        this._lastErrorMessage = '';
    }

    private _Save(): void {
        this._lastErrorMessage = '';
        this._isErrorOnSaving = false;
        this._isSaving = true;
        this._childrenCardService.savePsychiatristsConclusion(this.childCardId, this._conclusion)
                                 .subscribe((conclusion: string) => {
                                     this._isSaving = false;
                                     jQuery('#psychiatristsConclusionFormModal').modal('hide');
                                     this.conclusionAdded.emit(conclusion);
                                 },
                                 (error: any) => { 
                                     this._isSaving = false;
                                     this._isErrorOnSaving = true;
                                     this._lastErrorMessage = 'При збереженні заключення \
                                        виникла помилка: \r\n' + <any>error;
                                 });
    }
}