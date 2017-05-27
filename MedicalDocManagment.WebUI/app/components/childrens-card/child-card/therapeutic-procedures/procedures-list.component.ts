import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import ChildCardModel from "../../../../models/child-card/child-card.model";
import ChildrenCardService from '../../../../services/children-card.service';
import MainAppService from "../../../../services/main-app.service";
import RehabilitationModel from "../../../../models/child-card/rehabilitation.model";

@Component({
    moduleId: module.id,
    selector: 'procedures-list',
    templateUrl: 'procedures-list.component.html'
})
export default class ProceduresListComponent implements OnInit {

    private _rehabilitations: RehabilitationModel[];
    private _childCard: ChildCardModel;
    private _lastLoadingErrorMessage: string;
    private _isLoading: boolean = false;
    private _isErrorOnLoading: boolean;
    private _childCardId: number;

    constructor(private _childrenCardService: ChildrenCardService, private _mainAppService: MainAppService) {
        this._childCard = _mainAppService.currentCard;
    }

    ngOnInit() {
        this._loadRehabilitations();
    }

    private _loadRehabilitations(): void {
        if (this._childCardId != null) {
            this._rehabilitations = [];
            this._isLoading = true;
            this._isErrorOnLoading = false;
            this._lastLoadingErrorMessage = '';

            this._childrenCardService.getChildsRehabilitations(this._childCardId)
                .subscribe((rehabilitations: RehabilitationModel[]) => {
                    this._rehabilitations = this._rehabilitations.concat(rehabilitations);
                    this._isLoading = false;
                },
                (error: any) => {
                    this._isLoading = false;
                    this._isErrorOnLoading = true;
                    this._lastLoadingErrorMessage = 'При отриманні інформації про призначення \
                    виникла помилка: \r\n' + <any>error;
                });
        }
    }

    @Input()
    set childCardId(newId: number) {
        if (this._childCardId != newId) {
            this._childCardId = newId;
            this._loadRehabilitations();
        }
    }
}