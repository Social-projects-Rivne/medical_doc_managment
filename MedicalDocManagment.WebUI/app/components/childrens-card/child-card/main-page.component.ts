import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import ChildCardModel from "../../../models/child-card/child-card.model";
import ChildrenCardService from '../../../services/children-card.service';
import MainAppService from "../../../services/main-app.service";

@Component({
    moduleId: module.id,
    selector: 'main-page',
    templateUrl: 'main-page.component.html'
})
export default class MainPageComponent {
    private _childCard: ChildCardModel;
    private _childrenCardService: ChildrenCardService;
    private _currentUsersPositionName: string;
    private _isLoading: boolean;
    private _isErrorOnLoading: boolean;
    private _lastLoadingErrorMessage: string;
    private _mainAppService: MainAppService;

    constructor(childrenCardService: ChildrenCardService, mainAppService: MainAppService,
        route: ActivatedRoute) {
        this._childrenCardService = childrenCardService;
        this._childCard = mainAppService.currentCard;
        this._currentUsersPositionName = this._childrenCardService.currentUsersPositionName;
        this._isLoading = false;
        this._isErrorOnLoading = false;
        this._lastLoadingErrorMessage = '';
        this._mainAppService = mainAppService;

        if (!this._childCard) {
            route.params.subscribe(params => {
                this._childCard = new ChildCardModel({ id: params['id'] });
                this._loadChildCard(params['id']);
            })
        }
    }

    private _loadChildCard(childCardId: number): void {
        this._isLoading = true;
        this._isErrorOnLoading = false;
        this._lastLoadingErrorMessage = '';

        this._childrenCardService.getChildCard(childCardId)
            .subscribe((childCard: ChildCardModel) => {
                this._childCard = this._mainAppService.currentCard = childCard;
                this._isLoading = false;
            },
            (error: any) => {
                this._isLoading = false;
                this._isErrorOnLoading = true;
                this._lastLoadingErrorMessage = 'При отриманні картки пацієнта \
                    виникла помилка: \r\n' + <any>error;
            });
    }
}