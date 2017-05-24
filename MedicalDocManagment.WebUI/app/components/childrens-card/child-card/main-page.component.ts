import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import ChildCardModel from "../../../models/child-card/child-card.model";
import VisitModel from "../../../models/visit.model";
import ChildrenCardService from '../../../services/children-card.service';
import MainAppService from "../../../services/main-app.service";
import VisitService from '../../../services/visit.service';
import SharedService from '../../../services/shared.service';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';

@Component({
    moduleId: module.id,
    selector: 'main-page',
    templateUrl: 'main-page.component.html',
    providers: [
        VisitService,
        SharedService,
        NotificationsService
    ]
})
export default class MainPageComponent {
    visits: VisitModel[];
    private _childCard: ChildCardModel;
    private _childrenCardService: ChildrenCardService;
    private _currentUsersPositionName: string;
    private _isLoading: boolean;
    private _isErrorOnLoading: boolean;
    private _lastLoadingErrorMessage: string;
    private _mainAppService: MainAppService;
    private _visitService: VisitService;
    private _sharedService: SharedService;
    private _notificationService: NotificationsService;
    
    constructor(childrenCardService: ChildrenCardService, mainAppService: MainAppService,
        visitService: VisitService, sharedService: SharedService,
        notificationService: NotificationsService,
        route: ActivatedRoute) {
        this.visits = [];
        this._childrenCardService = childrenCardService;
        this._childCard = mainAppService.currentCard;
        this._currentUsersPositionName = this._childrenCardService.currentUsersPositionName;
        this._isLoading = false;
        this._isErrorOnLoading = false;
        this._lastLoadingErrorMessage = '';
        this._mainAppService = mainAppService;
        this._visitService = visitService;
        this._sharedService = sharedService;
        this._notificationService = notificationService;

        if (!this._childCard) {
            route.params.subscribe(params => {
                this._childCard = new ChildCardModel({ id: params['id'] });
                this._loadChildCard(params['id']);
                this._loadPatientVisits(params['id']);
            })
        }
    }

    addVisit(visitModel: VisitModel) {
        this.visits.push(visitModel);
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

    private _loadPatientVisits(childCardId: number) {
        this._visitService.getVisitsByPatientId(childCardId)
            .subscribe(
                (visits: VisitModel[]) => {
                    this.visits = visits;
                },
                (error: any) => {
                    console.log(error);
                }
            );
    }

}