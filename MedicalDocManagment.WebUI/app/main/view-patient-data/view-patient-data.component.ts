import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/observable/of';

// TODO change from mockup after implementing feature
//import { MainHttpFacade } from '../main-http.facade';
import { MainHttpFacade } from '../main-http-facade.mockup';

import ChildCardModel from '../models/child-card.model';
import ChildrenCardsModel from '../models/children-cards.model';
import ViewPatientDataModel from '../models/view-patient-data.model';

@Component({
    moduleId: module.id,
    selector: 'view-patient-data',
    templateUrl: 'view-patient-data.component.html',
    providers: [MainHttpFacade]
})

export default class ViewPatientDataComponent {
    private _isErrorOnSearching: boolean;
    private _isNotFound: boolean;
    private _isSearching: boolean;
    private _mainHttpFacade: MainHttpFacade;
    private _lastErrorMessage: string;
    private _searchResult: Observable<ChildrenCardsModel>;
    private _triedToSearch: boolean;
    private _patientToView: ViewPatientDataModel;

    constructor(mainHttpFacade: MainHttpFacade) {
        this._isErrorOnSearching = false;
        this._isSearching = false;
        this._lastErrorMessage = '';
        this._searchResult = null;
        this._triedToSearch = false;
        this._patientToView = new ViewPatientDataModel();

        this._mainHttpFacade = mainHttpFacade;
    }

    viewPatientData(): void {
        this._isErrorOnSearching = false;
        this._isSearching = true;
        this._searchResult = null;
        this._triedToSearch = true;

        this._mainHttpFacade.viewPatientData(this._patientToView)
            .subscribe((data: ChildrenCardsModel) => {
                this._searchResult = data ? Observable.of(data) : null;
                this._isSearching = false;
            },
            (error: any) => { this._handleSearchError(error); });
    }

    private _handleSearchError(error: any) {
        this._isSearching = false;
        this._isErrorOnSearching = true;
        this._lastErrorMessage = 'При перегляді виникла помилка: \r\n' + <any>error;
    }
}

