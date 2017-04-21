import { AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/observable/of';
declare var $;

import { MainHttpFacade } from '../main-http.facade';

import ChildCardModel from '../models/child-card.model';
import ChildrenCardsModel from '../models/children-cards.model';
import ViewPatientDataModel from '../models/view-patient-data.model';

@Component({
    moduleId: module.id,
    selector: 'view-patient-data',
    templateUrl: 'view-patient-data.component.html',
    providers: [MainHttpFacade]
})

export default class ViewPatientDataComponent implements AfterViewInit {
    @ViewChild('birthDatePicker') _birthDatePicker: ElementRef;
    private _birthDatePickerTouched: boolean;
    private _isErrorOnSearching: boolean;
    private _isNotFound: boolean;
    private _isSearching: boolean;
    private _lastErrorMessage: string;
    private _mainHttpFacade: MainHttpFacade;
    private _patientToView: ViewPatientDataModel;
    private _searchResult: Observable<ChildrenCardsModel>;
    private _triedToSearch: boolean; 

    constructor(mainHttpFacade: MainHttpFacade) {
        this._birthDatePickerTouched = false;
        this._isErrorOnSearching = false;
        this._isSearching = false;
        this._lastErrorMessage = '';
        this._mainHttpFacade = mainHttpFacade;
        this._patientToView = new ViewPatientDataModel();
        this._searchResult = null;
        this._triedToSearch = false;
    }

    ngAfterViewInit(): void {
        $(this._birthDatePicker.nativeElement).datepicker({
            autoclose: true,
            language: 'uk'
        });
        $(this._birthDatePicker.nativeElement).on('changeDate', (e) => {
            this._birthDatePickerTouched = true;
            this._patientToView.birthDate = e.date;
        });
        $(this._birthDatePicker.nativeElement).on('clearDate', (e) => {
            this._patientToView.birthDate = null;
        });
        $(this._birthDatePicker.nativeElement).on('show', (e) => {
            this._birthDatePickerTouched = true;
        });
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

